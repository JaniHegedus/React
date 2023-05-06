import { useState, useCallback } from "react";
import { Image } from "./components/components.js";

function App() {
    const [data, setData] = useState(null);
    const [filter, setFilter] = useState(null);
    const [unsaturate, setUnsaturate] = useState([]);

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
            <h1 className="text-2xl text-cyan-700 mt-4 text-center">
                Képek ki-be kapcsolása
            </h1>
            <div className={"pl-2 ml-4"}>
                <label htmlFor={"filter"}>Szűrés: </label>
                <input
                    type={"checkbox"}
                    id={"filter"}
                    name={"filter"}
                    onChange={filterCallback}
                />
            </div>
            {data && (
                <div className={"flex flex-wrap"}>
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
                                    <label>
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
