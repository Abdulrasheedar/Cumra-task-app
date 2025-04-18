
// Utility function to generate authorization headers for API requests
export const getAuthHeaders = (token) => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
    return headers;
  };
  