import { server_express_url } from "../CardOfInstitutional/lib";

function isNewFileName(newName: string) {
  if (newName) {
    return newName + ".jpg";
  }
}
export async function addCertifcation(name: string, number: string, img: File) {
  const formData = new FormData();
  formData.append("file", img, isNewFileName(name + number));
  const response = await fetch(`${server_express_url}/upload-img-doc`, {
    method: "POST",
    body: formData,
  });
  return response.ok;
}
