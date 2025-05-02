"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Title from "./Title";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { DualRangeSlider } from "../ui/dual-range-slider";
import { Button } from "../ui/button";
import CheckboxFilterGroup from "./CheckboxFilterGroup";

interface Props {
    className?: string;
}

const ingredients = [
    "Сырный соус",
    "Моцарелла",
    "Чеснок",
    "Соленые огурцы",
    "Красный лук",
    "Томаты",
    "Сырный соус",
    "Моцарелла",
    "Чеснок",
    "Соленые огурцы",
    "Красный лук",
    "Томаты",
];

export default function Filters({ className }: Props) {
    const [sliderValues, setSliderValues] = useState([0, 5000]);
    const [doughType, setDoughType] = useState();

    return (
        <aside className={cn("w-[220px] pb-10 flex-none", className)}>
            <Title text="Фильтрация" />
            <div className="flex flex-col gap-4 pb-6 pt-8 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <Checkbox id="customizable" />
                    <label htmlFor="customizable">Можно собирать</label>
                </div>
                <div className="flex items-center gap-3">
                    <Checkbox id="new" />
                    <label htmlFor="new">Новинки</label>
                </div>
            </div>
            <div className="flex flex-col gap-4 pb-6 pt-8 border-b border-gray-100">
                <Title text="Цена от и до:" size="xs" />
                <div className="flex gap-4">
                    <div className="relative">
                        <Input value={sliderValues[0]} className="h-10" />
                        <span className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400">
                            ₽
                        </span>
                    </div>
                    <div className="relative">
                        <Input value={sliderValues[1]} className="h-10" />
                        <span className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400">
                            ₽
                        </span>
                    </div>
                </div>
                <DualRangeSlider
                    value={sliderValues}
                    onValueChange={setSliderValues}
                    min={0}
                    max={5000}
                    step={1}
                />
            </div>
            <CheckboxFilterGroup title="Ингредиенты: " items={ingredients} />
            <div className="flex flex-col gap-4 pb-6 pt-8">
                <Title text="Тип теста:" size="xs" />
                <div className="flex items-center gap-3">
                    <Checkbox
                        value={"traditional"}
                        id="tranditional"
                        className="rounded-full w-6 h-6"
                        radio
                    />
                    <label htmlFor="tranditional">Традиционное</label>
                </div>
                <div className="flex items-center gap-3">
                    <Checkbox
                        value={"thin"}
                        id="thin"
                        className="rounded-full w-6 h-6"
                        radio
                    />
                    <label htmlFor="thin">Тонкое</label>
                </div>
            </div>
            <Button className="w-full h-12">Применить</Button>
        </aside>
    );
}
