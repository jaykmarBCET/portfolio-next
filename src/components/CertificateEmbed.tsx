import React from "react";

const CertificateEmbed = ({
    embedUrl,

}: {
    embedUrl?: string;
}) => {
    return (
        <div className="relative w-[800px] h-[600px] overflow-hidden border rounded-xl shadow">
            <iframe
                src={embedUrl}
                className="absolute top-[-300px] left-[-250px] w-[1500px] h-[1500px] border-0 scale-110"
                scrolling="no"
            />
        </div>

    );
};

export default CertificateEmbed;
