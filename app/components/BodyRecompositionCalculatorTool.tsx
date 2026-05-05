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

type RecompositionPreset = {
  key: string;
  label: string;
  adjustmentPct: number;
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

const RECOMPOSITION_PRESETS: RecompositionPreset[] = [
  {
    key: "fat-loss",
    label: "Fat-Loss Focus",
    adjustmentPct: -12,
    note: "Higher-fat-loss bias while preserving muscle.",
    rowClass: "bg-rose-50",
  },
  {
    key: "maintenance",
    label: "Maintenance Recomp",
    adjustmentPct: 0,
    note: "Slow recomposition around maintenance.",
    rowClass: "bg-blue-50",
  },
  {
    key: "lean-gain",
    label: "Lean-Gain Focus",
    adjustmentPct: 6,
    note: "Small surplus for performance and muscle gain.",
    rowClass: "bg-emerald-50",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: "Set Your Baseline",
    description:
      "Enter age, sex, height, weight, and activity so the calculator can estimate your maintenance calories.",
  },
  {
    id: 2,
    title: "Choose Strategy",
    description:
      "Pick a calorie adjustment around maintenance based on whether you want more fat loss, balance, or lean gain.",
  },
  {
    id: 3,
    title: "Track and Adjust",
    description:
      "Run your target for 2-3 weeks, then move calories by 100-150 kcal if your weekly trend is off target.",
  },
];

const APPLY_RESULTS_STEPS = [
  {
    id: 1,
    title: "Hit Protein Daily",
    description:
      "Keep protein consistent while training to support muscle retention and growth during recomposition.",
  },
  {
    id: 2,
    title: "Watch Weekly Trends",
    description:
      "Use weekly average body weight, gym performance, and photos instead of reacting to single weigh-ins.",
  },
  {
    id: 3,
    title: "Iterate Slowly",
    description:
      "Small adjustments beat big swings. Keep each change for at least 10-14 days before changing again.",
  },
];

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is body recomposition?",
    answer:
      "Body recomposition means reducing body fat while maintaining or building muscle over time, usually by staying near maintenance calories with strong training and high protein.",
  },
  {
    question: "How is recomposition different from bulking or cutting?",
    answer:
      "Bulking prioritizes muscle gain with a larger surplus, and cutting prioritizes fat loss with a deeper deficit. Recomposition aims for slower, more balanced progress between both goals.",
  },
  {
    question: "Should I start with a deficit, maintenance, or a small surplus?",
    answer:
      "Use a small deficit if fat loss is the priority, maintenance for balanced recomposition, and a small surplus if performance and muscle gain are the main focus.",
  },
  {
    question: "How much protein should I eat for recomposition?",
    answer:
      "Most people do well around 1.6 to 2.4 g of protein per kg body weight per day. The calculator provides a strong starting target you can keep consistent while adjusting calories.",
  },
  {
    question: "Do I need to hit macros exactly every day?",
    answer:
      "No. Keep protein consistent first, then stay close to total calories. Carbs and fats can flex based on training days, appetite, and food preference.",
  },
  {
    question: "How accurate is this calculator?",
    answer:
      "It is an estimate, not a perfect measurement. Your real needs depend on factors like NEAT, training volume, sleep, stress, and tracking consistency.",
  },
  {
    question: "How long should I run one calorie target before changing it?",
    answer:
      "Run it for about 2 to 3 weeks first, then adjust by roughly 100 to 150 kcal if weekly trend data shows progress is too slow or too fast for your goal.",
  },
  {
    question: "Can beginners recomp faster than advanced lifters?",
    answer:
      "Usually yes. Beginners and people returning after a break often see faster recomposition than advanced lifters, who generally need smaller, more precise adjustments.",
  },
  {
    question: "What weekly body-weight change should I expect?",
    answer:
      "Recomposition is usually slower than dedicated bulk or cut phases. Many people aim for roughly 0 to 0.5% body-weight change per week depending on goal focus.",
  },
  {
    question: "What if body weight is flat but I look leaner?",
    answer:
      "That can still be good progress. Use multiple signals: photos, waist measurements, gym performance, and weekly average body weight, not scale weight alone.",
  },
  {
    question: "Can I do cardio while recomposing?",
    answer:
      "Yes. Cardio can support fitness and energy expenditure, but keep resistance training as the priority and avoid adding so much cardio that recovery or performance drops.",
  },
  {
    question: "How often should I recalculate targets?",
    answer:
      "Recalculate when body weight changes meaningfully, activity level shifts, or training volume changes. Many people refresh targets every 4 to 8 weeks.",
  },
  {
    question: "Can women use this calculator the same way?",
    answer:
      "Yes. The calculator already accounts for sex in the BMR estimate. The same recomposition principles apply: progressive training, high protein, and trend-based calorie adjustments.",
  },
  {
    question: "What if I feel low energy or very hungry?",
    answer:
      "Increase calories slightly, prioritize protein and fiber-rich meals, and check sleep and hydration. Recomposition works best when the plan is sustainable and recovery stays strong.",
  },
  {
    question: "When should I switch from recomp to a dedicated cut or bulk?",
    answer:
      "Switch when your primary goal becomes speed over balance. If you need faster fat loss or faster muscle gain, a dedicated phase is often more efficient.",
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

export default function BodyRecompositionCalculatorTool() {
  const [units, setUnits] = useState<Units>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [ageYears, setAgeYears] = useState<number>(28);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(82);
  const [activityKey, setActivityKey] = useState<ActivityKey>("moderate");
  const [adjustmentPct, setAdjustmentPct] = useState<number>(0);

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
  const targetCalories = maintenanceCalories * (1 + adjustmentPct / 100);
  const calorieDelta = targetCalories - maintenanceCalories;

  const weeklyWeightChangeKg = (calorieDelta * 7) / 7700;
  const weeklyWeightChangeLb = weeklyWeightChangeKg * 2.2046226218;

  const proteinGrams = Math.round(weightKg * 2.2);
  const fatGrams = Math.round(weightKg * 0.8);
  const carbGrams = Math.max(
    0,
    Math.round((targetCalories - proteinGrams * 4 - fatGrams * 9) / 4),
  );

  const nearestPreset = useMemo(
    () =>
      RECOMPOSITION_PRESETS.reduce((best, preset) => {
        if (!best) return preset;
        return Math.abs(preset.adjustmentPct - adjustmentPct) < Math.abs(best.adjustmentPct - adjustmentPct)
          ? preset
          : best;
      }, RECOMPOSITION_PRESETS[0]),
    [adjustmentPct],
  );

  const dailyDeltaLabel = calorieDelta >= 0 ? "Daily Surplus" : "Daily Deficit";

  return (
    <main className="bg-base-100">
      <section className="flex flex-col items-center justify-start pt-8 px-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-center">Body Recomposition Calculator</h1>
        <p className="mt-4 text-center text-lg text-gray-700 max-w-3xl mx-auto">
          Estimate maintenance calories, choose your recomposition strategy, and get daily calorie
          plus macro targets you can actually run.
        </p>

        <div className="w-full max-w-5xl mt-10">
          <h2 className="text-3xl lg:text-4xl font-semibold text-center">How It Works</h2>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
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

        <div id="faq" className="w-full max-w-5xl mt-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mt-4">Body Recomposition Calculator FAQ</h2>
          <p className="py-6 text-lg mb-2 text-center text-gray-700 max-w-3xl mx-auto">
            Common questions about calorie targets, macro setup, and how to adjust your plan over time.
          </p>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={`${item.question}-${idx}`} className="collapse collapse-plus border bg-base-500 rounded-lg">
                <input type="radio" name="recomp-faq-accordion" />
                <div className="collapse-title text-lg lg:text-xl">{item.question}</div>
                <div className="collapse-content">
                  <p className="text-lg text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                  label="Calorie Adjustment"
                  valueLabel={`${formatSigned(adjustmentPct)}% vs maintenance`}
                  value={adjustmentPct}
                  min={-15}
                  max={10}
                  step={1}
                  onChange={setAdjustmentPct}
                />

                <p className="mt-6 text-sm text-gray-600 leading-relaxed">
                  This estimate uses the Mifflin-St Jeor BMR equation and an activity multiplier.
                  Use real weekly trend data to personalize targets.
                </p>
              </div>

              <div className="bg-base-100 p-6 lg:p-8 min-w-0">
                <div className="rounded-2xl bg-white border p-6 text-center shadow-sm">
                  <p className="text-sm text-gray-600">Daily Calorie Target</p>
                  <p className="mt-1 text-4xl font-bold text-primary">{Math.round(targetCalories)} kcal/day</p>
                  <p className="mt-2 text-sm text-gray-600">{nearestPreset.label}</p>
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
                    <div className="text-xs text-gray-600">{dailyDeltaLabel}</div>
                    <div className="text-lg font-semibold text-gray-900">{formatSigned(Math.round(calorieDelta))} kcal</div>
                  </div>
                  <div className="rounded-xl bg-base-200/60 p-3">
                    <div className="text-xs text-gray-600">Weekly Weight Change</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatSigned(round(weeklyWeightChangeKg, 2))} kg / {formatSigned(round(weeklyWeightChangeLb, 2))} lb
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
                        <th className="px-3 py-2 font-semibold text-gray-700">Recomposition Strategy</th>
                        <th className="px-3 py-2 font-semibold text-gray-700 text-right">kcal/day</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECOMPOSITION_PRESETS.map((preset) => {
                        const isActive = preset.key === nearestPreset.key;
                        const presetTarget = Math.round(
                          maintenanceCalories * (1 + preset.adjustmentPct / 100),
                        );
                        return (
                          <tr key={preset.key} className={preset.rowClass}>
                            <td
                              className={`px-3 py-2 ${isActive ? "border-l-4 border-gray-900 font-semibold" : "text-gray-800"}`}
                            >
                              {preset.label}
                              <span className="ml-2 text-xs text-gray-600">({formatSigned(preset.adjustmentPct)}%)</span>
                              <div className="text-xs text-gray-600 mt-1">{preset.note}</div>
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
          <h2 className="text-3xl lg:text-4xl font-semibold text-center">How to Use Your Result</h2>
          <p className="mt-4 text-center text-lg text-gray-700 max-w-3xl mx-auto">
            Recomposition works best when calories, training, and recovery are consistent for at
            least a few weeks at a time.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {APPLY_RESULTS_STEPS.map((step) => (
              <article key={step.id} className="rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">{step.id}. {step.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-gray-700">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
