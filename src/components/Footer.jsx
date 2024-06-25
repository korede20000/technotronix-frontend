




function Footer() {
  return (
    <div className="bg-black py-[40px] px-[50px] flex flex-col lg:flex justify-between ">
        <div className="flex items-center">
            <p className="text-[24px] text-orange-600  lg:text-[30px] font-bold">TECHNOTRONIX</p>
        </div>
        <div>
            <h1 className="text-[18px]  text-orange-600  font-bold mb-[10px]">Useful Links</h1>
            <ul>
                <li>
                    <a href="" className="hover: text-white">Home</a>
                </li>
                <li>
                    <a href="" className="hover: text-white">contact</a>
                </li>
                <li>
                    <a href="" className="hover: text-white">Privacy Policy</a>
                </li>
                <li>
                    <a href="" className="hover: text-white">Terms and Conditions</a>
                </li>
            </ul>
        </div>
        <div>
            <h1 className="text-[18px]  text-orange-600  font-bold mb-[10px] ">Follow us</h1>
            <div className="flex gap-5">
                {/* <FaFacebook/>
                <FaXTwitter/>
                <FaSquareInstagram/>
                <FaTiktok/> */}
            </div>
        </div>
        <div>
            <p className=" text-orange-600 ">&copy;Copyright Technotronix | All rights reserved</p>
        </div>

    </div>
  )
}

export default Footer