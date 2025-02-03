import logo from "../assets/concentrix_catalyst_logo.jpeg";

function LogoApp() {
  return (
    <div className="w-full">
      <div className="w-10 h-10 my-2 mx-5">
        <img src={logo} alt="Logo" style={{ borderRadius: "16px" }} />
      </div>
    </div>
  );
}

export default LogoApp;
