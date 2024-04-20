import wineData from '../data';
import { Table, MantineProvider } from '@mantine/core';

function Flavanoids() {

    const flavanoidData: number[][] = [];

    // store the flavanoids data for each class
    for(let i = 0; i < wineData.length; i++) {
        const data = wineData[i];
        const clas = data.Alcohol;
        const flavanoid = data.Flavanoids;

        if(flavanoidData.length < clas) {
            const tempData = [flavanoid];
            flavanoidData.push(tempData);
        }
        else {
            flavanoidData[clas - 1].push(flavanoid);
        }
    }

    interface result {
        clas: number,
        mean: number,
        median: number,
        mode: number
    }
    const results: result[] = [];
    
    // Calculate mean, median, and mode for each class
    for(let i = 0; i < flavanoidData.length; i++) {
        const dataArray = flavanoidData[i];

        // Mean, + sign to convert it back to number(toFixed returns string)
        let mean = +(dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length).toFixed(3);

        // Median, + sign to convert it back to number(toFixed returns string)
        const sortedFlavanoidData = dataArray.sort((a, b) => a - b);
        const middleIndex = Math.floor(sortedFlavanoidData.length / 2);
        const median = +(sortedFlavanoidData.length % 2 === 0 ? 
            (sortedFlavanoidData[middleIndex - 1] + sortedFlavanoidData[middleIndex]) / 2 :
            sortedFlavanoidData[middleIndex]).toFixed(3);

        // Mode
        const count: Record<number, number> = {};
        for (const value of dataArray) {
            count[value] = (count[value] || 0) + 1;
        }
        let mode = Object.keys(count).reduce((a, b) => count[Number(a)] > count[Number(b)] ? a : b);
        mode = parseFloat(mode).toFixed(3);

        results.push({
            clas: i+1,
            mean,
            median,
            mode: Number(mode)
        });
    }

    // console.log(results[0].mean, results[0].median, results[0].mode);

  return (
    <MantineProvider>
        <h1>Flavanoids Data</h1>
        <Table withTableBorder withColumnBorders>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>Measure</Table.Th>
            {results.map(data => <Table.Th key={data.clas}>Class {data.clas}</Table.Th>)}
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {/* mean */}
            <Table.Tr>
                <Table.Th>Flavanoids Mean</Table.Th>
                {results.map(data => <Table.Td key={data.clas}>{data.mean}</Table.Td>)}
            </Table.Tr>
            {/* median */}
            <Table.Tr>
                <Table.Th>Flavanoids Median</Table.Th>
                {results.map(data => <Table.Td key={data.clas}>{data.median}</Table.Td>)}
            </Table.Tr>
            {/* mode */}
            <Table.Tr>
                <Table.Th>Flavanoids Mode</Table.Th>
                {results.map(data => <Table.Td key={data.clas}>{data.mode}</Table.Td>)}
            </Table.Tr>
        </Table.Tbody>
        </Table>
    </MantineProvider>
  )
}

export default Flavanoids
