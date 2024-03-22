"use client";

import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const data02 = [
  { name: "À l'intention de l'utiliser (%)", value: 91, color: "#FFD907" },
  { name: "non (%)", value: 9, color: "#F9FAFB" },
];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            data={data02}
            innerRadius="40%"
            outerRadius="80%"
            fill="#ffffff"
            label={{ fontSize: 24 }}
          >
            {data02.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={data02[index].color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
