"use client";

import { useMemo, useState } from "react";

type Units = "metric" | "imperial";
type Sex = "male" | "female";
type ActivityKey = "sedentary" | "light" | "moderate" | "very" | "athlete";

type ActivityLevel = {
  key: ActivityKey;
  label: string;
  factor: number;
};

type BulkingPreset = {
  key: string;
  label: string;
  surplusPct: number;
  note: string;
  rowClass: string;
};

const ACTIVITY_LEVELS: ActivityLevel[] = [
  { key: "sedentary", label: "Sedentary (little exercise)", factor: 1.2 },
  { key: "light", label: "Light (1-3 training days/week)", factor: 1.375 },
  { key: "moderate", label: "Moderate (3-5 training days/week)", factor: 1.55 },
  { key: "very", label: "Very active (6-7 training days/week)", factor: 1.725 },
  { key: "athlete", label: "Athlete / physical job", factor: 1.9 },
];

const BULKING_PRESETS: BulkingPreset[] = [
  {
    key: "lean",
    label: "Lean Bulk",
    surplusPct: 5,
    note: "Slower gain, better for minimizing fat gain.",
    rowClass: "bg-emerald-50",
  },
  {
    key: "steady",
    label: "Steady Bulk",
    surplusPct: 10,
    note: "Balanced speed for most lifters.",
    rowClass: "bg-blue-50",
  },
  {
    key: "aggressive",
    label: "Aggressive Bulk",
    surplusPct: 15,
    note: "Faster gain, higher fat-gain risk.",
    rowClass: "bg-orange-50",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: "Enter Your Stats",
    description:
      "Add age, sex, height, weight, and activity level so the calculator can estimate your maintenance calories.",
  },
  {
    id: 2,
    title: "Choose Your Surplus",
    description:
      "Pick a calorie surplus that matches your goal: lean, steady, or aggressive bulking pace.",
  },
  {
    id: 3,
    title: "Follow and Adjust",
    description:
      "Use the calorie and macro targets daily, then adjust by 100-150 kcal if your weekly weight trend is off target.",
  },
];

function kgToLb(kg: number) {
  return kg * 2.2046226218;
}

function lbToKg(lb: number) {
  return lb / 2.2046226218;
}

function cmToIn(cm: number) {
  return cm / 2.54;
}

function inToCm(inches: number) {
  return inches * 2.54;
}

function formatFeetInches(totalInches: number) {
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}\"`;
}

function formatSigned(value: number) {
  if (value > 0) return `+${value}`;
  return `${value}`;
}

function round(value: number, decimals = 1) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

type SliderRowProps = {
  label: string;
  valueLabel: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

function SliderRow(props: SliderRowProps) {
  const { label, valueLabel, value, min, max, step, onChange } = props;

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold text-gray-900">{label}</span>
        <span className="text-sm text-gray-600">{valueLabel}</span>
      </div>
      <input
        type="range"
        className="range range-primary mt-2"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export default function BulkingCalorieCalculatorTool() {
  const [units, setUnits] = useState<Units>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [ageYears, setAgeYears] = useState<number>(28);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(82);
  const [activityKey, setActivityKey] = useState<ActivityKey>("moderate");
  const [surplusPct, setSurplusPct] = useState<number>(10);

  const weightLb = Math.round(kgToLb(weightKg));
  const heightIn = Math.round(cmToIn(heightCm));

  const activity = useMemo(
    () => ACTIVITY_LEVELS.find((level) => level.key === activityKey) ?? ACTIVITY_LEVELS[2],
    [activityKey],
  );

  const bmr = useMemo(() => {
    const sexConstant = sex === "male" ? 5 : -161;
    return 10 * weightKg + 6.25 * heightCm - 5 * ageYears + sexConstant;
  }, [sex, weightKg, heightCm, ageYears]);

  const maintenanceCalories = bmr * activity.factor;
  const targetCalories = maintenanceCalories * (1 + surplusPct / 100);
  const calorieSurplus = targetCalories - maintenanceCalories;

  const weeklyGainKg = (calorieSurplus * 7) / 7700;
  const weeklyGainLb = weeklyGainKg * 2.2046226218;

  const proteinGrams = Math.round(weightKg * 2.2);
  const fatGrams = Math.round(weightKg * 0.8);
  const carbGrams = Math.max(
    0,
    Math.round((targetCalories - proteinGrams * 4 - fatGrams * 9) / 4),
  );

  const nearestPreset = useMemo(
    () =>
      BULKING_PRESETS.reduce((best, preset) => {
        if (!best) return preset;
        return Math.abs(preset.surplusPct - surplusPct) < Math.abs(best.surplusPct - surplusPct)
          ? preset
          : best;
      }, BULKING_PRESETS[0]),
    [surplusPct],
  );

  return (
    <main className="bg-base-100">
      <section className="flex flex-col items-center justify-start pt-8 px-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-center">Bulking Calorie Calculator</h1>
        <p className="mt-4 text-center text-lg text-gray-700 max-w-3xl mx-auto">
          Estimate your daily bulking calories from BMR, activity, and surplus target, then use the
          macro split as a practical starting point.
        </p>

        <div className="w-full max-w-5xl mt-10">
          <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px]">
              <div className="p-6 lg:p-8 min-w-0">
                <div className="inline-flex rounded-xl border p-1 bg-base-100">
                  <button
                    type="button"
                    className={`btn btn-sm ${units === "imperial" ? "btn-primary text-white" : "btn-ghost"}`}
                    onClick={() => setUnits("imperial")}
                  >
                    Imperial
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${units === "metric" ? "btn-primary text-white" : "btn-ghost"}`}
                    onClick={() => setUnits("metric")}
                  >
                    Metric
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="font-semibold text-gray-900">Sex</div>
                  <select
                    className="select select-bordered"
                    value={sex}
                    onChange={(e) => setSex(e.target.value as Sex)}
                    aria-label="Select sex"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="font-semibold text-gray-900">Activity</div>
                  <select
                    className="select select-bordered w-full max-w-[280px]"
                    value={activityKey}
                    onChange={(e) => setActivityKey(e.target.value as ActivityKey)}
                    aria-label="Select activity level"
                  >
                    {ACTIVITY_LEVELS.map((level) => (
                      <option key={level.key} value={level.key}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <SliderRow
                  label="Age"
                  valueLabel={`${ageYears} years`}
                  value={ageYears}
                  min={16}
                  max={70}
                  step={1}
                  onChange={setAgeYears}
                />

                {units === "imperial" ? (
                  <>
                    <SliderRow
                      label="Height"
                      valueLabel={formatFeetInches(heightIn)}
                      value={heightIn}
                      min={55}
                      max={84}
                      step={1}
                      onChange={(inches) => setHeightCm(inToCm(inches))}
                    />
                    <SliderRow
                      label="Weight"
                      valueLabel={`${weightLb} lb`}
                      value={weightLb}
                      min={90}
                      max={350}
                      step={1}
                      onChange={(lb) => setWeightKg(lbToKg(lb))}
                    />
                  </>
                ) : (
                  <>
                    <SliderRow
                      label="Height"
                      valueLabel={`${Math.round(heightCm)} cm`}
                      value={Math.round(heightCm)}
                      min={140}
                      max={214}
                      step={1}
                      onChange={setHeightCm}
                    />
                    <SliderRow
                      label="Weight"
                      valueLabel={`${round(weightKg, 1)} kg`}
                      value={round(weightKg, 1)}
                      min={40}
                      max={160}
                      step={0.1}
                      onChange={setWeightKg}
                    />
                  </>
                )}

                <SliderRow
                  label="Bulking Surplus"
                  valueLabel={`${formatSigned(surplusPct)}% vs maintenance`}
                  value={surplusPct}
                  min={3}
                  max={20}
                  step={1}
                  onChange={setSurplusPct}
                />

                <p className="mt-6 text-sm text-gray-600 leading-relaxed">
                  This estimate uses the Mifflin-St Jeor BMR equation and an activity multiplier.
                  Adjust intake based on weekly trend data.
                </p>
              </div>

              <div className="bg-base-100 p-6 lg:p-8 min-w-0">
                <div className="rounded-2xl bg-white border p-6 text-center shadow-sm">
                  <p className="text-sm text-gray-600">Bulking Target</p>
                  <p className="mt-1 text-4xl font-bold text-primary">{Math.round(targetCalories)} kcal/day</p>
                  <p className="mt-2 text-sm text-gray-600">{nearestPreset.label} pace</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-base-200/60 p-3">
                    <div className="text-xs text-gray-600">BMR</div>
                    <div className="text-lg font-semibold text-gray-900">{Math.round(bmr)} kcal</div>
                  </div>
                  <div className="rounded-xl bg-base-200/60 p-3">
                    <div className="text-xs text-gray-600">Maintenance</div>
                    <div className="text-lg font-semibold text-gray-900">{Math.round(maintenanceCalories)} kcal</div>
                  </div>
                  <div className="rounded-xl bg-base-200/60 p-3">
                    <div className="text-xs text-gray-600">Daily Surplus</div>
                    <div className="text-lg font-semibold text-gray-900">+{Math.round(calorieSurplus)} kcal</div>
                  </div>
                  <div className="rounded-xl bg-base-200/60 p-3">
                    <div className="text-xs text-gray-600">Weekly Gain</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {round(weeklyGainKg, 2)} kg / {round(weeklyGainLb, 2)} lb
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border bg-white overflow-hidden">
                  <div className="px-4 py-3 border-b bg-gray-50 text-sm font-semibold text-gray-800">
                    Macro Starting Point
                  </div>
                  <div className="p-4 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-base-200/50 p-3 text-center">
                      <p className="text-xs text-gray-600">Protein</p>
                      <p className="text-lg font-semibold text-gray-900">{proteinGrams}g</p>
                    </div>
                    <div className="rounded-lg bg-base-200/50 p-3 text-center">
                      <p className="text-xs text-gray-600">Carbs</p>
                      <p className="text-lg font-semibold text-gray-900">{carbGrams}g</p>
                    </div>
                    <div className="rounded-lg bg-base-200/50 p-3 text-center">
                      <p className="text-xs text-gray-600">Fat</p>
                      <p className="text-lg font-semibold text-gray-900">{fatGrams}g</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border bg-white">
                  <table className="w-full text-left text-sm border-separate border-spacing-0">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 font-semibold text-gray-700">Bulking Style</th>
                        <th className="px-3 py-2 font-semibold text-gray-700 text-right">kcal/day</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BULKING_PRESETS.map((preset) => {
                        const isActive = preset.key === nearestPreset.key;
                        const presetTarget = Math.round(
                          maintenanceCalories * (1 + preset.surplusPct / 100),
                        );
                        return (
                          <tr key={preset.key} className={preset.rowClass}>
                            <td
                              className={`px-3 py-2 ${isActive ? "border-l-4 border-gray-900 font-semibold" : "text-gray-800"}`}
                            >
                              {preset.label}
                              <span className="ml-2 text-xs text-gray-600">(+{preset.surplusPct}%)</span>
                            </td>
                            <td
                              className={`px-3 py-2 text-right tabular-nums ${isActive ? "border-r-4 border-gray-900 font-semibold bg-white" : "text-gray-800"}`}
                            >
                              {presetTarget}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10 lg:pb-16">
        <div className="w-full max-w-5xl mx-auto pt-10 lg:pt-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-center">How to Use This Calculator</h2>
          <p className="mt-4 text-center text-lg text-gray-700 max-w-3xl mx-auto">
            Start with the estimate, run it for 2-3 weeks, then tune your calories based on your actual body-weight trend.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <article key={step.id} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary text-xl font-bold">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900">{step.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-left text-gray-700">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
