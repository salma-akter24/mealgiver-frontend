import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import "aos/dist/aos.css";

import RequestDonationModal from "../../components/Modal/RequestDonationModal";
import ReviewModal from "../../components/Modal/ReviewModal";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../components/MealGiver/Loading";
import { Helmet } from "react-helmet-async";

const DonationDetails = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();
  const queryClient = useQueryClient();

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Demo account detection
  const [isDemoAccount, setIsDemoAccount] = useState(false);
  const [demoStatusLoading, setDemoStatusLoading] = useState(true);

  // Check Firebase custom claims
  useEffect(() => {
    let isMounted = true;

    const checkDemoAccount = async () => {
      if (!user) {
        if (isMounted) {
          setIsDemoAccount(false);
          setDemoStatusLoading(false);
        }
        return;
      }

      setDemoStatusLoading(true);

      try {
        const tokenResult = await user.getIdTokenResult();

        if (isMounted) {
          setIsDemoAccount(tokenResult.claims.demo === true);
        }
      } catch (error) {
        console.error("Demo account detection failed:", error);

        if (isMounted) {
          setIsDemoAccount(false);
        }
      } finally {
        if (isMounted) {
          setDemoStatusLoading(false);
        }
      }
    };

    checkDemoAccount();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Fetch donation details
  const {
    data: donation,
    isLoading: donationLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch reviews
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["donationReviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?donationId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Save to favorites
  const handleSaveToFavorites = async () => {
    if (demoStatusLoading) return;

    if (isDemoAccount) {
      toast(
        "Demo accounts cannot save donations to Favorites. Please create a regular account to use this feature.",
        {
          icon: "ℹ️",
          duration: 4500,
        },
      );
      return;
    }

    try {
      await axiosSecure.post("/favorites", {
        email: user?.email,
        donationId: id,
      });

      toast.success("Saved to Favorites!");
    } catch (err) {
      console.error("Favorite error:", err);

      const message = err.response?.data?.message;

      if (err.response?.status === 409) {
        toast("This donation is already in your Favorites.", {
          icon: "ℹ️",
        });
      } else {
        toast.error(message || "Failed to save to Favorites.");
      }
    }
  };

  // Confirm pickup mutation
  const confirmPickup = useMutation({
    mutationFn: async (donationId) => {
      const res = await axiosSecure.patch(`/donations/${donationId}`, {
        status: "picked_up",
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPickups"],
      });

      queryClient.invalidateQueries({
        queryKey: ["donationDetails", id],
      });

      Swal.fire("Confirmed!", "Pickup confirmed successfully.", "success");
    },

    onError: (error) => {
      console.error("Pickup confirmation error:", error);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Could not confirm pickup.",
        "error",
      );
    },
  });

  // Handle pickup confirmation
  const handleConfirmPickup = () => {
    if (demoStatusLoading) return;

    if (isDemoAccount) {
      toast(
        "Demo accounts cannot confirm donation pickups. Please create a regular Charity account to use this feature.",
        {
          icon: "ℹ️",
          duration: 4500,
        },
      );

      return;
    }

    if (donation?._id) {
      confirmPickup.mutate(donation._id);
    }
  };

  // Loading
  if (donationLoading || roleLoading || demoStatusLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>MealGiver | Donation Details</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 font-montserrat">
        <div className="p-6 rounded-lg flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div
            data-aos="fade-right"
            className="flex-shrink-0 md:w-96 w-full rounded-md overflow-hidden shadow-sm"
          >
            <img
              src={donation?.image}
              alt={donation?.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Donation Information */}
          <div data-aos="fade-left" className="flex flex-col flex-grow">
            <h2 className="text-3xl font-semibold mb-4">{donation?.title}</h2>

            <div className="space-y-2 text-base">
              <p>
                <strong>Type:</strong> {donation?.type}
              </p>

              <p>
                <strong>Quantity:</strong> {donation?.quantity} KG
              </p>

              <p>
                <strong>Restaurant:</strong> {donation?.restaurant?.name}
              </p>

              <p>
                <strong>Location:</strong> {donation?.restaurant?.location}
              </p>

              <p>
                <strong>Pickup Window:</strong> {donation?.pickupWindow}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`capitalize font-medium ${
                    donation?.status === "available"
                      ? "text-green-600"
                      : donation?.status === "requested"
                        ? "text-yellow-600"
                        : donation?.status === "picked_up"
                          ? "text-blue-600"
                          : "text-gray-600"
                  }`}
                >
                  {donation?.status}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              {/* Save to Favorites */}
              {(role === "user" || role === "charity") && (
                <button
                  onClick={handleSaveToFavorites}
                  className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white px-6 py-2 rounded transition"
                >
                  Save to Favorites
                </button>
              )}

              {/* Request Donation */}
              {role === "charity" && donation?.status !== "picked_up" && (
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-6 py-2 rounded transition"
                >
                  Request Donation
                </button>
              )}

              {/* Confirm Pickup */}
              {role === "charity" && donation?.status !== "picked_up" && (
                <button
                  onClick={handleConfirmPickup}
                  disabled={confirmPickup.isPending}
                  className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-6 py-2 rounded transition disabled:opacity-50"
                >
                  {confirmPickup.isPending ? "Confirming..." : "Confirm Pickup"}
                </button>
              )}

              {/* Add Review */}
              {(role === "charity" || role === "user") && (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="bg-purple-500 hover:bg-purple-600 cursor-pointer text-white px-6 py-2 rounded transition"
                >
                  Add Review
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Reviews</h3>

          {reviews.length ? (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev._id} className="p-5 rounded shadow-sm">
                  <p className="font-semibold capitalize">{rev.reviewer}</p>

                  <p>{rev.comment}</p>

                  <p className="text-yellow-500 mt-1">⭐ {rev.rating}/5</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>

        {/* Request Donation Modal */}
        {showRequestModal && (
          <RequestDonationModal
            donation={donation}
            onClose={() => setShowRequestModal(false)}
            refetch={refetch}
          />
        )}

        {/* Review Modal */}
        {showReviewModal && (
          <ReviewModal
            donationId={id}
            donation={donation}
            user={user}
            onClose={() => setShowReviewModal(false)}
            refetchReviews={refetchReviews}
          />
        )}
      </div>
    </>
  );
};

export default DonationDetails;
