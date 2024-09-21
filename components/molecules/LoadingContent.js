import React from "react";
import Image from "next/image";

export default function LoadingContent() {
  return (
    <div className="d-flex justify-content-center">
      <div>
        <Image
          src="/assets/images/illustration/loading.gif"
          width={140}
          height={140}
          alt="Picture of the author"
          className="d-none d-md-block mt-3"
        />
        <div className="">
          <h6>Silahkan Tunggu . . .</h6>
        </div>
      </div>
    </div>
  );
}
