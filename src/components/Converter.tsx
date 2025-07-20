import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'motion/react';

const Converter = () => {
    const [temperature, setTemperature] = useState('');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const submitValidation = () => {
        const temp = parseFloat(temperature);
        return !isNaN(temp) && fromUnit !== '' && toUnit !== '';
    };

    const convertTemperature = () => {
        const temp = parseFloat(temperature);
        if (isNaN(temp)) return;

        let convertedValue;

        // Handle same unit conversion
        if (fromUnit === toUnit) {
            convertedValue = temp;
            setResult(convertedValue);
            return convertedValue;
        }

        switch (fromUnit) {
            case 'celsius':
                switch (toUnit) {
                    case 'fahrenheit':
                        convertedValue = (temp * 9/5) + 32;
                        break;
                    case 'kelvin':
                        convertedValue = temp + 273.15;
                        break;
                    default:
                        convertedValue = temp;
                }
                break;
            case 'fahrenheit':
                switch (toUnit) {
                    case 'celsius':
                        convertedValue = (temp - 32) * 5/9;
                        break;
                    case 'kelvin':
                        convertedValue = (temp - 32) * 5/9 + 273.15;
                        break;
                    default:
                        convertedValue = temp;
                }
                break;
            case 'kelvin':
                switch (toUnit) {
                    case 'celsius':
                        convertedValue = temp - 273.15;
                        break;
                    case 'fahrenheit':
                        convertedValue = (temp - 273.15) * 9/5 + 32;
                        break;
                    default:
                        convertedValue = temp;
                }
                break;
            default:
                convertedValue = temp;
        }
        setResult(convertedValue);
        return convertedValue;
    };

    const getUnitSymbol = (unit: string) => {
        switch (unit) {
            case 'celsius': return '°C';
            case 'fahrenheit': return '°F';
            case 'kelvin': return 'K';
            default: return '';
        }
    };

    const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTemperature(value);
        // Clear result if input changes
        setResult(null);
    };

    const handleFromUnitChange = (value: string) => {
        setFromUnit(value);
        // Clear result if 'From Unit' changes
        setResult(null);
    };

    const handleToUnitChange = (value: string) => {
        setToUnit(value);
        // Clear result if 'To Unit' changes
        setResult(null);
    };

    const handleConvert = () => {
        convertTemperature();
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">Temperature Converter</h1>
                <p className="text-sm font-roboto text-center mb-6 text-gray-800">Enter the temperature, select units and submit</p>
                <div className="flex flex-col items-center justify-center gap-4 mt-2 mb-2">
                    <div className="flex flex-col gap-2">
                        <Input
                            type="number"
                            step="any"
                            placeholder="Enter temperature"
                            className="w-72 border-2 border-gray-300 rounded-md p-3 text-center"
                            value={temperature}
                            onChange={handleTemperatureChange}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Select value={fromUnit} onValueChange={handleFromUnitChange}> {/* Changed to handleFromUnitChange */}
                            <SelectTrigger className="w-72">
                                <SelectValue placeholder="From Unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                                <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Select value={toUnit} onValueChange={handleToUnitChange}> {/* Changed to handleToUnitChange */}
                                <SelectTrigger className="w-72">
                                <SelectValue placeholder="To Unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                                <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 w-72 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed"
                            disabled={!submitValidation()}
                            onClick={handleConvert}
                        >
                            Convert
                        </Button>
                    </div>
                </div>

                <AnimatePresence>
                    {result !== null && (
                        <motion.div
                            key='conversionResult'
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0}}
                            exit={{ opacity: 0, y: -10}}
                            transition={{ duration: 0.3 }}
                            className='text-center p-4 bg-gray-50 rounded-lg mt-4'
                        >
                            <p className='text-xl font-semibold text-gray-800'>
                                {parseFloat(temperature)} {getUnitSymbol(fromUnit)} = {result.toFixed(2)} {getUnitSymbol(toUnit)}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Converter;