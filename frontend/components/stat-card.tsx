type statCardProps = {
    title: string;
    value: number|string;
    subtitle?: string;
};

export default function statCard({
    title,
    value,
    subtitle,
}: statCardProps){
    return(
        <div className = "rounded-x1 border border-white/10 bg-black/30 p-4">
            <p className = "text-sm text-white/60">{title}</p>
            <p className = "mt-2 text-2xl font-bold text-white">
                {value}
            </p>
            {subtitle && (
                <p className = "mt-1 text-sm text-white/60">
                    {subtitle}
                </p>
            )
            }
        </div>
    );
}