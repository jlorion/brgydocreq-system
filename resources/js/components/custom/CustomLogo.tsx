
interface CustomLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    logo: string;
}

const CustomLogo = ({ className, logo, ...props }: CustomLogoProps) => {
    return <img src={logo} className={className} {...props} />;
};

export default CustomLogo;
