export const auth = async (accessToken: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
    method: "POST",
    body: JSON.stringify({ accessToken }),
    cache: "no-store",
  });
};

export const fetchData = async (cookie?: string, startAfter?: number) => {
  const params = new URLSearchParams();
  if (startAfter) {
    params.set("startAfter", startAfter.toString());
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/data?${params.toString()}`,
    {
      headers: cookie ? { Cookie: `access_token=${cookie}` } : undefined,
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
};
