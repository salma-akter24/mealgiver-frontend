import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import {
  FaArrowRight,
  FaClipboardCheck,
  FaHandsHelping,
  FaLeaf,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaStoreAlt,
  FaUsers,
  FaUserCheck,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import FeaturedDonationsHome from "../FeaturedSection/FeaturedDonationsHome";
import LatestCharityRequests from "../charity/LatestCharityRequests";
import Faq from "../../../components/Faq";
import NewsLetter from "../../../components/NewsLetter";
import adminScreenshot from "../../../assets/screenshots/admin.png";
import restaurantScreenshot from "../../../assets/screenshots/restaurant.png";
import charityScreenshot from "../../../assets/screenshots/charity.png";
import foodDonationScreenshot from "../../../assets/screenshots/fooddonation.png";
import donationListingScreenshot from "../../../assets/screenshots/donationlisting.png";
import userManagementScreenshot from "../../../assets/screenshots/usermanagement.png";

const features = [
  {
    icon: <FaStoreAlt className="text-2xl" />,
    title: "Restaurant Food Donations",
    description:
      "Publish surplus food, manage listings, and track each donation from availability to collection.",
  },
  {
    icon: <FaHandsHelping className="text-2xl" />,
    title: "Charity Management",
    description:
      "Discover verified food opportunities, submit requests, and coordinate pickups with real-time status updates.",
  },
  {
    icon: <FaUsers className="text-2xl" />,
    title: "Individual Access",
    description:
      "Help spread awareness, discover opportunities, and support food access in the community.",
  },
  {
    icon: <FaClipboardCheck className="text-2xl" />,
    title: "Admin Dashboard",
    description:
      "Manage users, review donation activity, and oversee platform operations from a central admin view.",
  },
  {
    icon: <FaMapMarkedAlt className="text-2xl" />,
    title: "Real-Time Updates",
    description:
      "Status changes and request activity are surfaced where the current app already supports them.",
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    title: "Secure Authentication",
    description:
      "Access is protected with Firebase-backed auth and role-based route checks across the application.",
  },
];

const steps = [
  {
    title: "Restaurants Share Food",
    text: "Restaurants publish surplus food and set pickup windows with clear listing details.",
    icon: <FaStoreAlt />,
  },
  {
    title: "Charities Discover Donations",
    text: "Verified charities browse available donations and identify the right opportunities for their communities.",
    icon: <FaHandsHelping />,
  },
  {
    title: "Request and Coordinate",
    text: "Eligible users request food and coordinate collection, pickup, and handoff logistics within the app.",
    icon: <FaUserCheck />,
  },
  {
    title: "Reduce Food Waste",
    text: "Food is redirected to the people who need it instead of being discarded, building a more resilient local ecosystem.",
    icon: <FaLeaf />,
  },
];

const benefits = [
  "Reduce food waste",
  "Support local communities",
  "Connect restaurants with charities",
  "Improve donation coordination",
  "Make donation management easier",
  "Increase transparency",
];

const roleCards = [
  {
    name: "Administrator",
    description:
      "Review platform activity, manage users, and maintain healthy donation operations.",
    route: "/login",
  },
  {
    name: "Restaurant",
    description:
      "Share surplus food, manage donation listings, and respond to request flow.",
    route: "/login",
  },
  {
    name: "Charity",
    description:
      "Browse available food, request donations, and coordinate pickups with donors.",
    route: "/login",
  },
  {
    name: "Individual",
    description:
      "Explore donation opportunities, manage favorites, and support community impact.",
    route: "/login",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDemoClick = () => {
    if (user) {
      navigate("/dashboard");
      return;
    }
    navigate("/login");
  };

  return (
    <>
      <Helmet>
        <title>MealGiver – Food Donation Marketplace</title>
        <meta
          name="description"
          content="MealGiver connects restaurants, charities, and individuals to simplify food donations, reduce food waste, and support communities."
        />
      </Helmet>

      <main className="font-montserrat text-base-content bg-base-100">
        <section className="relative overflow-hidden border-b border-base-300 bg-gradient-to-br from-emerald-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.12),transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 lg:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-900/20 dark:text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Connecting communities. Reducing waste. Fighting hunger.
                </div>

                <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
                  Turn Surplus Food Into Hope.
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  MealGiver connects restaurants, charities, and individuals to
                  reduce food waste and make food accessible to those who need
                  it most.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={handleDemoClick}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                  >
                    Explore Live Demo
                    <FaArrowRight className="ml-2" />
                  </button>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    Get Started
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
                  <span>Verified donations</span>
                  <span>Community-first</span>
                  <span>Role-based access</span>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                  <div className="rounded-[1.5rem] bg-slate-100 p-4 dark:bg-slate-800">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-5 text-white">
                        <p className="text-sm font-medium text-emerald-100">
                          Available now
                        </p>
                        <p className="mt-5 text-3xl font-black">
                          Food Listings
                        </p>
                        <p className="mt-2 text-sm text-emerald-50">
                          Restaurant surplus and charity requests in one place.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
                          Status
                        </p>
                        <div className="mt-4 space-y-3">
                          <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                            Pickup ready
                          </div>
                          <div className="rounded-xl bg-orange-50 p-3 text-sm text-orange-700 dark:bg-orange-900/30 dark:text-orange-200">
                            Review needed
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl bg-white p-4 dark:bg-slate-900">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500 dark:text-slate-300">
                          Donation flow
                        </span>
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                          Live
                        </span>
                      </div>
                      <div className="mt-5 space-y-3">
                        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                          <span>Restaurant</span>
                          <span className="font-semibold text-emerald-600">
                            Share
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                          <span>Charity</span>
                          <span className="font-semibold text-orange-500">
                            Request
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                          <span>Community</span>
                          <span className="font-semibold text-primary">
                            Impact
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "Platform", value: "MealGiver" },
              { label: "Focus", value: "Food access" },
              { label: "Flow", value: "Restaurant → charity → community" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-base-content/60">
                  {stat.label}
                </p>
                <p className="mt-4 text-2xl font-black text-primary">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Key features
            </p>
            <h2 className="mt-3 text-3xl font-black text-base-content md:text-4xl">
              Built for food rescue and community impact.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-base-content">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-base-content/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="bg-base-200 py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-black text-base-content md:text-4xl">
                A transparent donation journey.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-lg text-primary">
                      {step.icon}
                    </span>
                    <span className="text-sm font-semibold text-base-content/60">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-base-content">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-base-content/70">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="screenshots"
          className="mx-auto max-w-7xl px-6 py-16 md:px-10"
        >
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Screenshots
            </p>
            <h2 className="mt-3 text-3xl font-black text-base-content md:text-4xl">
              Application views to capture for review.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                label: "Admin dashboard",
                image: adminScreenshot,
              },
              {
                label: "Restaurant dashboard",
                image: restaurantScreenshot,
              },
              {
                label: "Charity dashboard",
                image: charityScreenshot,
              },
              {
                label: "Food donation management",
                image: foodDonationScreenshot,
              },
              {
                label: "Donation listings",
                image: donationListingScreenshot,
              },
              {
                label: "User management",
                image: userManagementScreenshot,
              },
            ].map(({ label, image }) => (
              <div
                key={label}
                className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm"
              >
                <img
                  src={image}
                  alt={label}
                  loading="lazy"
                  className="aspect-video w-full rounded-2xl object-cover"
                />
                <h3 className="mt-3 text-base font-semibold text-base-content">
                  {label}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <section id="benefits" className="bg-base-200 py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Why choose MealGiver
              </p>
              <h2 className="mt-3 text-3xl font-black text-base-content md:text-4xl">
                A practical solution for smarter food sharing.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">
                    <FaLeaf />
                  </div>
                  <p className="text-lg font-semibold text-base-content">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roles" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              User roles
            </p>
            <h2 className="mt-3 text-3xl font-black text-base-content md:text-4xl">
              Designed around the people who make the system work.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {roleCards.map((role) => (
              <div
                key={role.name}
                className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"
              >
                <h3 className="text-2xl font-bold text-base-content">
                  {role.name}
                </h3>
                <p className="mt-3 text-base text-base-content/70">
                  {role.description}
                </p>
                <Link
                  to={role.route}
                  className="mt-5 inline-flex items-center font-semibold text-primary"
                >
                  Explore Your Dashboard <FaArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
          <div className="rounded-[2rem] border border-emerald-200 bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-10 text-white shadow-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">
                  Be part of the change
                </p>
                <h2 className="mt-2 text-3xl font-black md:text-4xl">
                  Together, we can reduce food waste and make a meaningful
                  difference.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="rounded-full text-center bg-white px-6 py-3 font-semibold text-nowrap text-emerald-700 transition hover:bg-emerald-50"
                >
                  Start Using MealGiver
                </Link>
                <button
                  onClick={handleDemoClick}
                  className="rounded-full border text-nowrap border-white/50 bg-transparent px-6 py-3 font-semibold text-white text-center cursor-pointer transition hover:bg-white/10"
                >
                  Explore Live Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
          <FeaturedDonationsHome />
          <LatestCharityRequests />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
          <Faq />
          <NewsLetter />
        </div>
      </main>
    </>
  );
};

export default Home;
