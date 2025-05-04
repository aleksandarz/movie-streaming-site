export function yearGenerator(from: number, to: number, defaultYear: null | number): void
{
    let yearSelection = document.querySelector("#year-selection") as HTMLSelectElement;

    for (let i = from; i >= to; i--)
    {
        let singleYear = document.createElement("option");
        if (i === defaultYear)
        {
            singleYear.selected = true;
        }
        singleYear.textContent = i.toString();
        singleYear.value = i.toString();
        yearSelection.append(singleYear);
    }
}