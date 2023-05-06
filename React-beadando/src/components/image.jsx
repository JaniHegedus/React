export function Image({ src, title, unsaturated }) {
    const imageStyle = unsaturated ? { filter: "grayscale(100%)" } : {};

    return (
        <div className={"imagee"} >
            <img src={src} alt={title} style={imageStyle} />
            <span className={"m-1"}>{title}</span>
        </div>
    );
}
