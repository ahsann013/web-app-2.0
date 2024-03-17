import React from 'react';

const Footer = () => {
    return (
      <div className='grid min-h-0 '>
    
        <footer className="grid-row bg-amber-400 mt-auto text-white" >
            <div className="container mx-auto text-center">
                <p className="text-lg mb-1">
                    &copy; {new Date().getFullYear()} GoEV. All Rights Reserved.
                </p>

                <p className="text-lg">
                    Contact: info@evgo.com | Phone: +92 307 9429420
                </p>
            </div>
        </footer>
        </div>
    );
};

export default Footer;

