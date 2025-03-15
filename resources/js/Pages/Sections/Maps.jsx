import { IconMapPin, IconPhone, IconBrandFacebook } from "@tabler/icons-react";

export default function Maps() {
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
                        <div className="flex items-center mb-2">
                            <IconMapPin
                                className="text-primary mr-2 md:mb-11"
                                size={24}
                            />
                            <p className="text-primary">
                                <strong>
                                    KP. NYOMPOK RT.017/008 Carenang Kec. Cisoka
                                </strong>
                                <br />
                                Kab. Tangerang Banten
                            </p>
                        </div>
                        <div className="flex items-center mb-2">
                            <IconPhone
                                className="text-primary mr-2"
                                size={24}
                            />
                            <p className="text-primary">+62 812-1234-1234</p>
                        </div>
                        <div className="flex items-center">
                            <IconBrandFacebook
                                className="text-primary mr-2"
                                size={24}
                            />
                            <p className="text-primary">@MTs La Tahzan</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
