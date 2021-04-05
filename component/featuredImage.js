import Image from "next/image";

const FeaturedImage = (props) => {
  const { src, alt, width, height } = props;
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout="intrinsic"
    />
  );
};

export default FeaturedImage;
