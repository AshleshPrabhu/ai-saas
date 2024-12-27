"use client";

import { Card } from "@/components/ui/card";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { toast } from "sonner";

// Define types for the data and API responses
interface DataItem {
name: string;
value: number;
}

interface TokenResponse {
success: boolean;
decodedToken: {
    id: string;
};
}

interface UserResponse {
user: {
    images: string[];
    videos: string[];
} | null;
}

const COLORS = ["#3b82f6", "#8b5cf6"];

export function StorageChart() {
const [data, setData] = useState<DataItem[]>([
    { name: "Videos", value: 0 },
    { name: "Images", value: 0 },
]);

const getData = useCallback(async (): Promise<void> => {
    try {
    const response = await axios.get<TokenResponse>("/api/get-token");
    if (!response.data.success) {
        toast.error("Failed to fetch token");
        return;
    }

    const userResponse = await axios.post<UserResponse>("/api/user", {
        id: response.data.decodedToken.id,
    });

    const user = userResponse.data.user;

    if (user && Array.isArray(user.images) && Array.isArray(user.videos)) {
        setData([
        { name: "Videos", value: user.videos.length },
        { name: "Images", value: user.images.length },
        ]);
    } else {
        setData([
        { name: "Videos", value: 0 },
        { name: "Images", value: 0 },
        ]);
        toast.error("No content data found");
    }
    } catch (error) {
    toast.error("An error occurred while fetching data");
    console.error("Error fetching data:", error);
    }
}, []);

useEffect(() => {
    getData(); // Fetch data on component mount
}, [getData]);

const total = data.reduce((sum, item) => sum + item.value, 0);

return (
    <Card className="p-6 bg-white border-2 border-blue-100">
    <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Content Distribution</h3>
        <p className="text-sm text-gray-600">Total content breakdown</p>
    </div>
    <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={140}
            paddingAngle={5}
            dataKey="value"
            >
            {data.map((entry, index) => (
                <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                />
            ))}
            </Pie>
            <Tooltip
            formatter={(value: number) =>
                `${value} files (${((value / total) * 100).toFixed(1)}%)`
            }
            contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "8px 12px",
            }}
            />
            <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value: string) => (
                <span className="text-gray-900">{value}</span>
            )}
            />
        </PieChart>
        </ResponsiveContainer>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item, index) => (
        <div key={item.name} className="text-center">
            <p className="text-sm text-gray-600">{item.name}</p>
            <p className="text-2xl font-bold" style={{ color: COLORS[index % COLORS.length] }}>
            {item.value.toLocaleString()}
            </p>
        </div>
        ))}
    </div>
    </Card>
);
}
