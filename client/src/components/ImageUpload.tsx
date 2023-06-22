/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState<string>("");
  const [images, setImages] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  const convertToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          console.log(reader.result);
          setImage(reader.result);
        }
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const uploadImage = () => {
    fetch("https://api-deployment-tau.vercel.app/file/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        file: image,
      }),
    })
      .then((res: any) => res.json())
      .then(() => {
        setFetchData((prevValue) => !prevValue);
        setImage("");
      });
  };

  const getImage = () => {
    fetch("https://api-deployment-tau.vercel.app/file", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setImages(data.data);
      });
  };

  useEffect(() => {
    getImage();
  }, [fetchData]);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        Let's upload Image
        <input accept="image/*" type="file" onChange={convertToBase64} />
        {image !== "" && <img width={100} height={100} src={image} />}
        <button onClick={uploadImage}>upload</button>
        {images.map((data: any) => (
          <img key={data._id} width={100} height={100} src={data.file} />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
