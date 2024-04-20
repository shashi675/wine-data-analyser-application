import wineData from '../data';
import { Table, MantineProvider } from '@mantine/core';

function Gamma() {

    const gammaData: number[][] = [];

    // store the gamma data for each class
    for(let i = 0; i < wineData.length; i++) {
        const data = wineData[i];
        const clas = data.Alcohol;
        const ash = data.Ash;
        const hue = data.Hue;
        const magnesium = data.Magnesium;

        // calculate gamma
        const gamma = (ash * hue) / magnesium;

        if(gammaData.length < clas) {
            const tempData = [gamma];
            gammaData.push(tempData);
        }
        else {
            gammaData[clas - 1].push(gamma);
        }
    }

    interface result {
        clas: number,
        mean: number,
        median: number,
        mode: number
    }
    const results: result[] = [];
    
    // Calculate mean, median, and mode of gamma values for each class
    for(let i = 0; i < gammaData.length; i++) {
        const dataArray = gammaData[i];

        // Mean, + sign to convert it back to number(toFixed returns string)
        let mean = +(dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length).toFixed(3);

        // Median, + sign to convert it back to number(toFixed returns string)
        const sortedgammaData = dataArray.sort((a, b) => a - b);
        const middleIndex = Math.floor(sortedgammaData.length / 2);
        const median = +(sortedgammaData.length % 2 === 0 ? 
            (sortedgammaData[middleIndex - 1] + sortedgammaData[middleIndex]) / 2 :
            sortedgammaData[middleIndex]).toFixed(3);

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


  return (
    <MantineProvider>
        <h2>Gamma Data</h2>
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
                <Table.Th>Gamma Mean</Table.Th>
                {results.map(data => <Table.Td key={data.clas}>{data.mean}</Table.Td>)}
            </Table.Tr>
            {/* median */}
            <Table.Tr>
                <Table.Th>Gamma Median</Table.Th>
                {results.map(data => <Table.Td key={data.clas}>{data.median}</Table.Td>)}
            </Table.Tr>
            {/* mode */}
            <Table.Tr>
                <Table.Th>Gamma Mode</Table.Th>
                {results.map(data => <Table.Td key={data.clas}>{data.mode}</Table.Td>)}
            </Table.Tr>
        </Table.Tbody>
        </Table>
    </MantineProvider>
  )
}

export default Gamma

