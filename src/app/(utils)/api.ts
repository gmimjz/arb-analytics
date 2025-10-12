export const auth = async (accessToken: string) => {
  await fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({ accessToken }),
    cache: "no-store",
  });
};

export const fetchData = async (startAfter: number) => {
  const params = new URLSearchParams();
  params.set("startAfter", startAfter.toString());

  const response = await fetch(`/api/data?${params.toString()}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
};
