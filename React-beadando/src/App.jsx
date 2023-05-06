import { useState, useCallback } from "react";
import { Image } from "./components/image.jsx";

function App() {
    const [data, setData] = useState(null);
    const [filter, setFilter] = useState(null);
    const [isContainerVisible, setIsContainerVisible] = useState(true);
    const [unsaturate, setUnsaturate] = useState([]);
    const toggleContainerVisibility = () => {
        setIsContainerVisible(!isContainerVisible);
    };

    fetch("db.json")
        .then((response) => response.json())
        .then(setData);

    const filterCallback = useCallback((event) => {
        setFilter(event.target.checked);
    }, []);

    const unsaturateCallback = useCallback(
        (index) => {
            setUnsaturate((prevUnsaturate) => {
                const updatedUnsaturate = [...prevUnsaturate];
                updatedUnsaturate[index] = !updatedUnsaturate[index];
                return updatedUnsaturate;
            });
        },
        []
    );
    return (
        <>
            <h1 className="maintext">
                <a onClick={toggleContainerVisibility}>Képek ki/be kapcsolása</a>
            </h1>
            <div className={"pl-2 ml-4"}>
                <label htmlFor={"filter"} className={"checkbox"}>Szűrés: </label>
                <input
                    type={"checkbox"}
                    id={"filter"}
                    name={"filter"}
                    onChange={filterCallback}
                />
            </div>
            {isContainerVisible && data && (
                <div className={"main"}>
                    {data.plants
                        .filter((t) => (filter ? t.active : true))
                        .map((img, index) => {
                            return (
                                <div key={index} className="image-container" >
                                    <Image
                                        src={img.pic}
                                        title={img.title}
                                        unsaturated={unsaturate[index]}
                                    />
                                    <label className={"checkbox"}>
                                        <input
                                            type="checkbox"
                                            checked={unsaturate[index]}
                                            onChange={() => unsaturateCallback(index)}
                                        />
                                        Színtelenítés
                                    </label>
                                </div>
                            );
                        })}
                </div>
            )}
        </>
    );
}

export default App;
