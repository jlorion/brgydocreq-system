import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomIcon from './CustomIcon';

interface CustomCardProps {
    image: string;
    title: string;
    content: string;
    alt: string;
}

const CustomCard = ({ image, title, content, alt }: CustomCardProps) => {
    return (
        <>
            <div className='relative h-68 w-90 cursor-pointer ease-in-out duration-300 hover:scale-104 hover:-translate-y-2 hover:shadow-lg'>
                <CustomIcon imgSrc={image} alt={alt} className="h-full w-full rounded-md object-cover border border-gray-300" />
                <Card className="gap-2 py-3 absolute border rounded-b-md bottom-0 border-gray-300">
                    <CardHeader className="px-4">
                        <CardTitle className="text-s3 text-center text-xl font-semibold">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className=" px-4 text-justify text-[13px] font-bold text-black">
                        {content}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CustomCard;
