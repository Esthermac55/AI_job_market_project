const dataUrl = "ai_job_market_insights.xlsx - ai_job_market_insights.csv";

        // --- SPEC 1: INDUSTRY BAR CHART ---
        const spec1 = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "data": {"url": dataUrl},
            "width": "container",
            "transform": [
                {"aggregate": [{"op": "count", "as": "count"}], "groupby": ["Industry"]},
                {"window": [{"op": "rank", "as": "rank"}], "sort": [{"field": "count", "order": "descending"}]},
                {"filter": "datum.rank <= 5"}
            ],
            "mark": {"type": "bar", "color": "#4338ca", "cornerRadiusEnd": 5},
            "encoding": {
                "y": {"field": "Industry", "type": "nominal", "sort": "-x", "title": null},
                "x": {"field": "count", "type": "quantitative", "title": "Job Postings"},
                "tooltip": [{"field": "Industry", "type": "nominal"}, {"field": "count", "type": "quantitative"}]
            }
        };

        // --- SPEC 2: JOB TITLES STACKED BAR ---
        const spec2 = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "data": {"url": dataUrl},
            "width": "container",
            "mark": "bar",
            "encoding": {
                "y": {"field": "Job_Title", "type": "nominal", "sort": "-x", "title": null},
                "x": {"aggregate": "count", "type": "quantitative", "title": "Frequency"},
                "color": {
                    "field": "AI_Adoption_Level", 
                    "type": "nominal",
                    "scale": {"range": ["#4338ca", "#a5b4fc", "#e0e7ff"]},
                    "title": "Adoption"
                },
                "tooltip": [{"field": "Job_Title", "type": "nominal"}, {"aggregate": "count", "title": "Count"}]
            }
        };

        // --- SPEC 3: SKILLS PACKED BUBBLE (STYLIZED CIRCLES) ---
        const spec3 = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "data": {"url": dataUrl},
            "width": "container",
            "transform": [
                {"aggregate": [{"op": "count", "as": "skill_count"}], "groupby": ["Required_Skills"]}
            ],
            "mark": {"type": "circle", "opacity": 0.8, "stroke": "#4338ca", "strokeWidth": 1},
            "encoding": {
                "x": {"field": "Required_Skills", "type": "nominal", "axis": null},
                "y": {"field": "skill_count", "type": "quantitative", "axis": null},
                "size": {"field": "skill_count", "type": "quantitative", "scale": {"range": [500, 3000]}, "legend": null},
                "color": {"field": "Required_Skills", "type": "nominal", "legend": null, "scale": {"scheme": "indigoes"}},
                "tooltip": [{"field": "Required_Skills", "title": "Skill"}, {"field": "skill_count", "title": "Count"}]
            }
        };

        // 3. RENDER ALL CHARTS
        vegaEmbed('#vis1', spec1, {"actions": false});
        vegaEmbed('#vis2', spec2, {"actions": false});
        vegaEmbed('#vis3', spec3, {"actions": false});