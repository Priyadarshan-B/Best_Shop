import React from "react";


const GenderCard = ({ gender, imageURL, onSelectGender }) => (
  <div className="gender-card" onClick={() => onSelectGender(gender, imageURL)}>
    <h2>{gender}</h2>
    <img src={imageURL} alt={`${gender} image`} />
  </div>
);

const GenderComponent = ({ onSelectGender }) => {
  const genders = [
    { gender: "Male", imageURL: "https://s3-alpha-sig.figma.com/img/f5d2/90e0/0fd31a9cd0bd1ebecdcd5e835d6f1a80?Expires=1701648000&Signature=mthxPeoFxejT7~W7VgF~H6UZlE5jtR3HcJv01EhGzqhm2AABMNj9eYmTwuOzm~rZ8OfD0sB0u1QhUOgaI9uHhhRzxwkWDp1MAhH0jMbNWgtoLR4FAI1rdJAF3PXwHpZaYtbXI~2XDnsXAxBbnHwpfbal-ZYtETy4ymzpDmjbc-r9cq4hA2W6hjlagVl8fJ63KN8Xj47cwIRH4KDNej~syCc8V-SnIgyRIIKnmlE-C01RIPJSpL34018HLzOAVndD-3WdJS5neSAm1kHLXdYHL8R-to6xjkTI8~TNRb1E5x5vSfWDtpE-IQ9J81hC5erQTLhR1wzLk3sItd2EwrTl8Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" },
    { gender: "Female", imageURL: "https://s3-alpha-sig.figma.com/img/eb39/42d5/43609bdca472ed4554e9d28f57bb6eb1?Expires=1701648000&Signature=egp84sIx8gIXfKJXZM4bGEJIg0-iY-e7XMSjBoWtHEH742fkkjf4rdafbYgbJoTkvRTS-iCC8d3qYSWgyPzA73j56VOn67UrwhTGeQQJAnqdw-noMx8aeTvKoiCyw5ebkysos5MtM9e5vJlrOKmCaAK9iBLSPfPhSKzY4SNfmQK2PzkPGBRrstVKsxv4tsK4a6kE6CF9gkvGOjCLPkSssrUU30IE25bpNzot~dezdKVlBIF-BlwCsKbjWIOF43o7k1qH-Fw8iykEsNEUcSFlT8Aop-c6Wo4EsQQJQx0ptnNCyN1rrF1fat~NHJHM3bea6KL8fK6C6CV5QNKO5-FM4g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" },
    { gender: "Kids", imageURL: "https://s3-alpha-sig.figma.com/img/8218/bfe5/d3a2a90a09feeaf583e73d33682dc265?Expires=1701648000&Signature=Hr81~pR2pc4tKmA5H8fT5Sf~-Zf8hgV3TysTtgOI1xA6VFBb-xbW31B0Q-hVPRaXOQAfHFYe6p6Lkn8xga55yMuVXATQvs5tIdrPFfJzqFqePVIzcoYn5uijghXZOYIZb7vxz6S9hHakMMA6pr4gechYQpiIVMs3FgFHVlC8Yb0ALRj7-jv17KwbE4DqCJNk-6XG8UVMOaGQlKrBGHMolTzKCq4piwKYEnvDD8VgLKJC1h7Yx26l7VqKn7dWVJ8VTU5YGCaYdcdgJriUDHE58eOSvE7gCFhQodmeNDV9mH3eXUMOVZuz8JpCtCy1g5HtLo~YS0-IJcrOSRsozIvhsQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" },
  ];

  return (
    <div className="gender-component">
      {genders.map(({ gender, imageURL }) => (
        <GenderCard
          key={gender}
          gender={gender}
          imageURL={imageURL}   
          onSelectGender={onSelectGender}
        />
      ))}
    </div>
  );
};

export default GenderComponent;
