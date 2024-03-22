import Image from "next/image";

const Button = () => {
  return (
    <a
      href="/contact"
      className="px-8 py-4 text-md sm:px-10 sm:py-6 sm:text-lg whitespace-nowrap bg-blue-500 rounded-2xl shadow-custom text-white flex items-center gap-2 contact-button hover:bg-sky-600 hover:text-white transition-all duration-500 hover:scale-105"
    >
      <Image
        src="/greet.svg"
        alt="Greet icon"
        width={40}
        height={40}
        style={{ objectFit: "contain" }}
        className="shake"
      />
      &nbsp;Nous contacter
    </a>
  );
};

export default Button;
