import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomIcon from './CustomIcon';

interface CustomCardProps {
    image: string;
    title: string;
    content: string;
    alt: string;
    onClick?: () => void;
}

const CustomCard = ({ image, title, content, alt, onClick }: CustomCardProps) => {
    return (
        <>
            <div
                className="relative h-68 w-90 cursor-pointer duration-300 ease-in-out hover:-translate-y-2 hover:scale-104 hover:shadow-lg"
                onClick={onClick}
            >
                <CustomIcon imgSrc={image} alt={alt} className="h-full w-full rounded-md border border-gray-300 object-cover" />
                <Card className="absolute bottom-0 gap-2 rounded-b-md border border-gray-300 py-3">
                    <CardHeader className="px-4">
                        <CardTitle className="text-s3 text-center text-xl font-semibold">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 text-justify text-[13px] font-bold text-black">{content}</CardContent>
                </Card>
            </div>
        </>
    );
};

export default CustomCard;
