import Button from "./button";

const Footer = () => {
  return (
    <div className="w-full bg-black flex justify-center sm:justify-between items-center p-6 sm:p-24 h-[200px]">
      <p className="text-white hidden sm:block">Sowhat®&nbsp;&nbsp;2024</p>
      <Button />
    </div>
  );
};

export default Footer;
