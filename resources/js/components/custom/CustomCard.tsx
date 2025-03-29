import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomCardProps {
    image: string;
    title: string;
    content: string;
    alt: string;
}

const CustomCard = ({ image, title, content, alt }: CustomCardProps) => {
    return (
        <>
            <div className="relative h-[30vh] w-[350px] cursor-pointer">
                <div>
                    <img src={image} alt={alt} className="h-full w-full rounded-xl object-cover shadow-lg" />
                </div>
                <div className="absolute bottom-[2vh] left-1/2 h-[15vh] w-[90%] -translate-x-1/2 translate-y-1/2 transform rounded-xl bg-white shadow-lg">
                    <Card className="gap-2 py-3">
                        <CardHeader className="px-4">
                            <CardTitle className="text-s3 text-center text-xl font-semibold">{title}</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 text-justify h-20 text-[13px] font-bold text-black">{content}</CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CustomCard;
