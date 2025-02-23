export default async function DataProvinsi() {
  try {
    const apiKeyDaerah = process.env.API_KEY_DAERAH;

    const response = await fetch(`https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKeyDaerah}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to submit");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
