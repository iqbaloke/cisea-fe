import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const ChartDashboard = ({ data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    // instance chart XY
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    // X axis (Kategori)
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
      })
    );
    xAxis.data.setAll(data);

    // Y axis (Nilai)
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // seri data
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
      })
    );
    series.data.setAll(data);

    series.columns.template.setAll({
      tooltipText: "{categoryX}: [bold]{valueY}[/]",
      width: am5.percent(90),
      tooltipY: 0,
    });

    // clear chart ketika unmounted
    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }}></div>;
};

export default ChartDashboard;
