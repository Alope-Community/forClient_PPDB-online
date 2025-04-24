import MapMarkerIcon from "@/Components/icons/MapMarker";
import PhoneIcon from "@/Components/icons/Phone";
import { usePage } from "@inertiajs/react";

export default function Maps() {
    const { info } = usePage().props;

    return (
        <div className="w-full flex items-center justify-center py-8 px-4">
            <div className="flex flex-col md:flex-row items-center justify-center rounded-lg">
                <div className="w-full md:w-1/2 max-w-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.846593167475!2d-122.08424968469218!3d37.421999779825295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb24c5d1b1b55%3A0xa28bd7c29b5b5f7c!2sGoogleplex!5e0!3m2!1sen!2sus!4v1618970631903!5m2!1sen!2sus"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-2">Kontak Kami</h2>
                        <div className="flex items-center mb-2 gap-3">
                            <div className="text-primary">
                                <MapMarkerIcon />
                            </div>
                            <p className="text-primary">{info.Alamat}</p>
                        </div>
                        <div className="flex items-center mb-2 gap-3">
                            <div className="text-primary mr-2">
                                <PhoneIcon />
                            </div>
                            <p className="text-primary">
                                {info["Nomor Telepon"]}
                            </p>
                        </div>
                        {/* <div className="flex items-center gap-3">
                            <p className="text-3xl font-bold mr-3">f</p>
                            <p className="text-primary">@MTs PUI CIKASO</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
