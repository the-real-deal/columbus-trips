import { useMemo } from "react"
import { PieChart, Pie, Label } from "recharts"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export interface PoiTheme {
    poiId: string
    category: string
    weight: number
}

const palette = [
    "#4E79A7", // blu
    "#F28E2B", // arancione
    "#E15759", // rosso
    "#76B7B2", // turchese
    "#59A14F", // verde
    "#EDC949", // giallo senape
    "#AF7AA1", // viola
    "#FF9DA7", // rosa
    "#9C755F", // marrone
    "#BAB0AC", // grigio
]

type PoiThemesChartProps = {

    data: PoiTheme[]
    className?: string
}

export default function PoiThemesChart({ data, className }: PoiThemesChartProps) {
    const { chartData, chartConfig, totalWeight } = useMemo(() => {

        const grouped = data.reduce<Record<string, number>>((acc, curr) => {
            acc[curr.category] = (acc[curr.category] ?? 0) + curr.weight
            return acc
        }, {})

        const entries = Object.entries(grouped)

        const chartData = entries.map(([category, weight], idx) => ({
            category,
            weight,
            fill: palette[idx % palette.length],
        }))

        const chartConfig: ChartConfig = {
            weight: { label: "Weight" },
        }

        entries.forEach(([category], idx) => {
            chartConfig[category] = {
                label: category,
                color: palette[idx % palette.length],
            }
        })

        const totalWeight = entries.reduce((sum, [, w]) => sum + w, 0)

        return { chartData, chartConfig, totalWeight }
    }, [data])

    if (!chartData.length) {
        return (
            <p className="w-full text-center text-muted-foreground">
                Nessun dato disponibile.
            </p>
        )
    }

    return (
        <ChartContainer
            config={chartConfig}
            className={`${className ?? ""} w-full mx-auto aspect-square max-h-[300px]`}
        >
            <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                    data={chartData}
                    dataKey="weight"
                    nameKey="category"
                    innerRadius={70}
                    strokeWidth={5}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {totalWeight}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy as number) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            Weight
                                        </tspan>
                                    </text>
                                )
                            }
                            return null
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    )
}