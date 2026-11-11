import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import PrivateRoute from "../routes/PrivateRoute";
import Forbidden from "../components/Forbidden";
import NotFound from "../components/NotFound";
import Loading from "../components/MealGiver/Loading";

const lazyPage = (importer) => async () => ({
  Component: (await importer()).default,
});

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        lazy: lazyPage(() => import("../pages/home/Home/Home")),
      },
      {
        path: "all-donations",
        lazy: lazyPage(() => import("../pages/AllDonations/AllDonations")),
      },
      {
        path: "donation-details/:id",
        lazy: async () => {
          const { default: DonationDetails } = await import(
            "../pages/DonationDetails/DonationDetails"
          );
          return {
            Component: () => (
              <PrivateRoute>
                <DonationDetails />
              </PrivateRoute>
            ),
          };
        },
      },
      {
        path: "about-us",
        lazy: lazyPage(() => import("../components/AboutPage")),
      },
      {
        path: "contact-us",
        lazy: lazyPage(() => import("../components/ContactUsPage")),
      },
      {
        path: "coverage",
        lazy: lazyPage(() => import("../components/Branches/Coverage")),
        loader: () => fetch("./districtBranches.json"),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
    ],
  },
  {
    path: "/dashboard",
    lazy: async () => {
      const { default: DashboardLayout } = await import(
        "../layouts/DashboardLayout"
      );
      return {
        Component: () => (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
      };
    },

    children: [
      // Common for all roles
      {
        index: true,
        lazy: lazyPage(
          () => import("../pages/home/Home/Dashboard/DashboardHome")
        ),
      },

      // User Routes
      {
        path: "my-profile",
        lazy: lazyPage(
          () => import("../pages/home/Home/Dashboard/UserDashboard/MyProfile")
        ),
      },
      {
        path: "request-charity",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/CharityDashboard/RequestCharity"
            )
        ),
      },
      {
        path: "charity-transactions",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/CharityDashboard/TransactionHistory"
            )
        ),
      },
      {
        path: "favorites",
        lazy: lazyPage(
          () =>
            import("../pages/home/Home/Dashboard/UserDashboard/Favorites")
        ),
      },
      {
        path: "my-reviews",
        lazy: lazyPage(
          () =>
            import("../pages/home/Home/Dashboard/UserDashboard/MyReviews")
        ),
      },

      // Charity Routes
      {
        path: "charity-profile",
        lazy: lazyPage(
          () =>
            import("../pages/home/Home/Dashboard/CharityDashboard/CharityProfile")
        ),
      },
      {
        path: "my-requests",
        lazy: lazyPage(
          () =>
            import("../pages/home/Home/Dashboard/CharityDashboard/MyRequests")
        ),
      },
      {
        path: "my-pickups",
        lazy: lazyPage(
          () =>
            import("../pages/home/Home/Dashboard/CharityDashboard/MyPickups")
        ),
      },
      {
        path: "received-donations",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/CharityDashboard/ReceivedDonations"
            )
        ),
      },

      // Restaurant Routes
      {
        path: "restaurant-profile",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/RestaurantDonations/profile/RestaurantProfile"
            )
        ),
      },
      {
        path: "add-donation",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/RestaurantDonations/AddDonation"
            )
        ),
      },
      {
        path: "my-donations",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/RestaurantDonations/MyDonations"
            )
        ),
      },
      {
        path: "edit-donation/:id",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/RestaurantDonations/UpdateDonationForm"
            )
        ),
      },
      {
        path: "requested-donations",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/RestaurantDonations/RequestedDonations"
            )
        ),
      },

      // Admin Routes
      {
        path: "admin-profile",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/AdminDashboard/AdminProfile"
            )
        ),
      },
      {
        path: "manage-users",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/AdminDashboard/AdminManageUsers"
            )
        ),
      },
      {
        path: "manage-donations",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/AdminDashboard/AdminManageDonations"
            )
        ),
      },
      {
        path: "manage-role-requests",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/AdminDashboard/ManageRoleRequests"
            )
        ),
      },
      {
        path: "manage-requests",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/AdminDashboard/ManageRequests "
            )
        ),
      },
      {
        path: "feature-donations",
        lazy: lazyPage(
          () =>
            import(
              "../pages/home/Home/Dashboard/AdminDashboard/FeatureDonations "
            )
        ),
      },
    ],
  },
  {
    path: "/",
    lazy: lazyPage(() => import("../layouts/AuthLayout")),
    children: [
      {
        path: "login",
        lazy: lazyPage(
          () => import("../pages/home/Home/Authentications/Login/Login")
        ),
      },
      {
        path: "register",
        lazy: lazyPage(
          () => import("../pages/home/Home/Authentications/Register")
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
