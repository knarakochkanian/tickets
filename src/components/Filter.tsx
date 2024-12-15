interface FilterProps {
    stopsFilter: number | null;
    setStopsFilter: (stops: number | null) => void;
}

const Filter = ({ stopsFilter, setStopsFilter }: FilterProps) => {
    const stopsOptions = [0, 1, 2];

    return (
        <div className="space-y-2">
            <h2 className="font-semibold">Фильтр по пересадкам</h2>
            <ul>
                {stopsOptions.map((stops) => (
                    <li key={stops}>
                        <label>
                            <input
                                type="radio"
                                name="stops"
                                checked={stopsFilter === stops}
                                onChange={() => setStopsFilter(stops)}
                                className="mr-2"
                            />
                            {stops} пересадок
                        </label>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => setStopsFilter(null)}
                className="px-4 py-2 border rounded
                    bg-[#a5b4fc] text-black"
            >
                Сбросить фильтр
            </button>
        </div>
    );
};

export default Filter;
