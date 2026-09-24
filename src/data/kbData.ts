import { KBCategory } from '../types/dashboard';

export const KB_DATA: Record<'policies' | 'helpers' | 'process', KBCategory[]> = {
  policies: [
    {
      cat: "HR Policies",
      subs: [
        {
          title: "Quarterly Bonus",
          content: `<div class="prose-block"><div class="prose-title">General Conditions</div><div class="prose-text">Paid on the following payroll cycle after completing the quarter (e.g., Q1 bonus paid on April cycle). Subject to taxation.
Employees must work at least 14 working days monthly to be eligible for the Q bonus.</div></div>
<div class="prose-block"><div class="prose-title">New Joiners</div><div class="prose-text">Must work at least 2 months during the quarter after passing the probation period. Eligible amount is prorated based on months worked outside of probation.
Must pass the 3-month probation period successfully.
Must have an average KPI of 85% for the remaining months after passing probation during the quarter.</div></div>
<div class="prose-block"><div class="prose-title">Resigning Employees</div><div class="prose-text">Any employee who resigned before the Q bonus payroll date will not be eligible (even if the last day is on or after the payroll date).
Employees terminated or who reach the end of their contract are not eligible.</div></div>
<div class="prose-block box-warning"><div class="prose-title text-warning">KPI & Warning Conditions</div><div class="prose-text">20% will be deducted from the quarterly bonus if the employee has two instances of lateness in a month or any no-shows in the quarter.
Should achieve 2/3 months at 80% or above & no month is below 70%.
Employees must not have any warnings during the quarter.
More than one warning = not eligible for any Q bonus for the whole year. One final warning = not eligible for any Q bonus for the whole year.</div></div>`
        },
        {
          title: "Attendance & Variable Pay",
          content: `<div class="prose-block"><div class="prose-title">Variable Pay (VP) & Leave Rules</div><div class="prose-text">Proration: Your Variable Pay is now prorated based on the actual days worked in the month 
(replacing the old 14-working-day eligibility rule).
Leave Exception (For G05 and below): You are allowed up to 5 days of approved leave (Annual, Casual, or Sick) per month without it affecting your VP proration. Proration applies if you exceed 5 days of leave or if you join/exit the company mid-month.
VP Calculation: Monthly VP = Monthly KPI Score (85% Business Results + 15% Attendance Reliability) × 23%.</div></div>
<div class="prose-block"><div class="prose-title">Absenteeism & No-Show</div><div class="prose-text">An absence or "no-show" occurs if you don't attend work without an approved leave, if your sick leave is invalidated due to improper documentation, or if you fail to notify the company.
Cases and Consequences:
1 Case: Loss of monthly bonus + 25% deduction on Variable Pay.
2 Cases: Loss of monthly bonus + 50% deduction on Variable Pay.
3+ Cases: Loss of quarterly month bonus + 75% deduction on Variable Pay + Warning Letter.</div></div>
<div class="prose-block"><div class="prose-title">Lateness Rules (Start of Shift)</div><div class="prose-text">You have a monthly grace allowance of 22 minutes. If you exceed this, deductions apply:
1 to 5 mins over: 0% lateness metric, but no impact on Variable Pay.
6 to 10 mins over: 10% deduction on Variable Pay.
11+ mins over: 20% deduction on Variable Pay.</div></div>
<div class="prose-block box-warning"><div class="prose-title text-warning">Perfect Attendance Award</div><div class="prose-text">Reward: EGP 1,000 monthly (separate from Variable Pay and performance bonuses).
Eligibility: Ops employees at level G05 and below.
Criteria: Must have absolutely zero absenteeism/no-shows, zero lateness, zero attendance-related warnings, and 100% full compliance with scheduled shifts.</div></div>`
        },
        {
          title: "Sick Leave Policy",
          content: `<div class="prose-block"><div class="prose-title">1. Requesting Sick Leave</div><div class="prose-text">Submit requests via the Success Factors platform under "Time Off" > "Sick Leave."
Deadline: You have a 3-day window (the actual sick day + the 2 following days). The system officially closes at 11:59 PM daily.
Required Documents: You must attach a single PDF containing the stamped/dated sick note, AXA form, lab tests, and X-rays (if requested by the doctor). If no tests were requested, just upload the AXA form and sick note.
Note: If culture tests or MRIs take more than 3 days for results, you must submit the booking receipt to hold your request.
Important Rules: If a sick leave is rejected, you cannot change it to Annual or Unpaid Leave. Also, any sick leave linked to an AXA-excluded service will be declined.</div></div>
<div class="prose-block"><div class="prose-title">2. Medical Networks & Blacklisted Hospitals</div><div class="prose-text">Sick leaves are only accepted from the AXA Network (find it via Hotline 16363 or the MY AXA app).
Blacklisted Hospitals (DO NOT USE): Sick leaves from the following will be rejected:
Al-Amal (Mohandseen), Al Marwa (Mohandseen), Al-Salam (Mohandseen), Aman (Helwan), El Shorouk (Mohandseen), El Rahma, and Dawi Clinics.</div></div>
<div class="prose-block"><div class="prose-title">3. Specific Medical Cases</div><div class="prose-text">Planned Sick Leave (Surgeries, etc.):
Shift Employees: Email Workforce, Direct Manager, and HR with the medical report/surgery date. Inform Workforce of the duration. Submit the leave request once you get the admission report.
Non-Shift Employees: Email Direct Manager and HR, then submit the request upon admission.
Frequent Sick Leaves: If you request sick leave frequently for the same diagnosis, HR will schedule an appointment with the company doctor to determine if the condition is chronic.
Chronic Medication: Send your medical card, report, prescription, and tests to CHRONIC.MEDICATIONS@AXA_EGYPT.COM.
Pregnancy: Medical insurance does not cover pregnancy. You must use annual leave, unpaid leave, or up to 45 days of maternity leave before delivery.</div></div>
<div class="prose-block"><div class="prose-title">4. Family Additions & Refunds</div><div class="prose-text">Adding Family (Spouse/Children only): Open Tawasol > HR > Benefits/Medical Card.
Attach personal photos and Marriage Certificate/National ID (for spouses) or Birth Certificates (for children).
Medical Refunds: Apply via Tawasol (HR > Benefits/Medical Card) with a digital copy of your documents and invoices, then deliver the physical hard copies to the HR office.</div></div>`
        }
      ]
    },
    {
      cat: "KPIs",
      subs: [
        {
          title: "KPIs Overview",
          content: `<table class="prose-table">
<tr><th>Metric</th><th>Weight</th><th>Rules & Calculations</th></tr>
<tr><td>Quality</td><td class="font-mono text-cyan-500 font-bold text-center">20%</td><td>Minimum quality score is 80%. Unlimited cases monitored.</td></tr>
<tr><td>Proc. Accuracy</td><td class="font-mono text-cyan-500 font-bold text-center">10%</td><td>4 Cases per week , 2.5% each week - 2 Fails in a week scores 0 for it<br>Finance missing sales & wrong losses update will be added</td></tr>
<tr><td>SLA</td><td class="font-mono text-cyan-500 font-bold text-center">10%</td><td>Target is 10 minutes.<br>Between 10-15 minutes = score 5%.<br>More than 15 minutes = score 0%.</td></tr>
<tr><td>Occupancy</td><td class="font-mono text-cyan-500 font-bold text-center">25%</td><td>85% = 12%<br>95-104.99% = 15%<br>105-114.99% = 18%<br>115-124.99% = 22%<br>Above 124.99% = 25%</td></tr>
<tr><td>Productivity</td><td class="font-mono text-cyan-500 font-bold text-center">15%</td><td>Minimum is 90% (Available & Meeting). Break max 60 mins.<br>Meeting < 20% = 15%<br>Meeting 20-25% = 10%<br>Meeting 25-30% = 5%<br>Meeting > 30% = Zero.<br><br><span class="text-red-500 font-bold">Break to not exceed more than twice a month. Any kind of abusing will affect 5% of your score.</span></td></tr>
<tr><td>Attendance</td><td class="font-mono text-cyan-500 font-bold text-center">10%</td><td>1 Unplanned day<br>4 Sick Leaves YTD</td></tr>
<tr><td>Adherence</td><td class="font-mono text-cyan-500 font-bold text-center">10%</td><td>22 minutes lateness calculated from Fingerprint = 5%.<br>5 times maximum lateness (each not to exceed 14 mins).<br>60 minutes lateness calculated from Salesforce login time = 5%.</td></tr>
</table>`
        }
      ]
    }
  ],
  helpers: [
    {
      cat: "Baggage & Seat Fees",
      subs: [
        {
          title: "Baggage & Seat Fees",
          content: `<div class="prose-block"><div class="prose-title">Point of Sale Pricing</div>
<div class="overflow-x-auto custom-scroll mt-4">
    <table class="w-full text-center border-collapse">
        <thead>
            <tr class="dark:bg-black/30 bg-gray-100 text-[10px] uppercase font-black tracking-widest text-black dark:text-white border-b-2 border-cyan-500">
                <th class="p-4 text-left">POS & Region</th>
                <th class="p-4">Country Code</th>
                <th class="p-4">Currency</th>
                <th class="p-4 text-cyan-500">Fee (One Way)</th>
                <th class="p-4 text-cyan-500">Fee (Return)</th>
            </tr>
        </thead>
        <tbody class="font-mono text-sm font-semibold divide-y dark:divide-white/5 divide-black/5 text-black dark:text-gray-300">
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">KSA <span class="ml-2 text-[9px] uppercase tracking-widest bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded">Domestic</span></td>
                <td class="p-4 text-gray-500">966</td><td class="p-4 text-gray-500">SAR</td><td class="p-4 text-cyan-500 text-lg">23</td><td class="p-4 text-cyan-500 text-lg">40.25</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">KSA <span class="ml-2 text-[9px] uppercase tracking-widest dark:bg-white/10 bg-black/10 text-gray-500 px-2 py-1 rounded">Inter</span></td>
                <td class="p-4 text-gray-500">966</td><td class="p-4 text-gray-500">SAR</td><td class="p-4 text-lg">20</td><td class="p-4 text-lg">35</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">Bahrain <span class="ml-2 text-[9px] uppercase tracking-widest bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded">Domestic</span></td>
                <td class="p-4 text-gray-500">973</td><td class="p-4 text-gray-500">BHD</td><td class="p-4 text-cyan-500 text-lg">2.30</td><td class="p-4 text-cyan-500 text-lg">4.02</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">Bahrain <span class="ml-2 text-[9px] uppercase tracking-widest dark:bg-white/10 bg-black/10 text-gray-500 px-2 py-1 rounded">Inter</span></td>
                <td class="p-4 text-gray-500">973</td><td class="p-4 text-gray-500">BHD</td><td class="p-4 text-lg">2</td><td class="p-4 text-lg">3.5</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">Kuwait</td>
                <td class="p-4 text-gray-500">965</td><td class="p-4 text-gray-500">KWI</td><td class="p-4 text-lg">2</td><td class="p-4 text-lg">3.50</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">UAE</td>
                <td class="p-4 text-gray-500">971</td><td class="p-4 text-gray-500">AED</td><td class="p-4 text-lg">20</td><td class="p-4 text-lg">35</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">Oman <span class="ml-2 text-[9px] uppercase tracking-widest bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded">Domestic</span></td>
                <td class="p-4 text-gray-500">968</td><td class="p-4 text-gray-500">OMR</td><td class="p-4 text-cyan-500 text-lg">2.30</td><td class="p-4 text-cyan-500 text-lg">2.02</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">Oman <span class="ml-2 text-[9px] uppercase tracking-widest dark:bg-white/10 bg-black/10 text-gray-500 px-2 py-1 rounded">Inter</span></td>
                <td class="p-4 text-gray-500">968</td><td class="p-4 text-gray-500">OMR</td><td class="p-4 text-lg">2</td><td class="p-4 text-lg">3.50</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">Qatar</td>
                <td class="p-4 text-gray-500">974</td><td class="p-4 text-gray-500">QAR</td><td class="p-4 text-lg">20</td><td class="p-4 text-lg">35</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">USD <span class="ml-2 text-[9px] uppercase tracking-widest dark:bg-white/10 bg-black/10 text-gray-500 px-2 py-1 rounded">Inter</span></td>
                <td class="p-4 text-gray-500">-</td><td class="p-4 text-gray-500">USD</td><td class="p-4 text-lg">5.3</td><td class="p-4 text-lg">9.3</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 text-left font-bold">USD <span class="ml-2 text-[9px] uppercase tracking-widest bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded">Domestic</span></td>
                <td class="p-4 text-gray-500">-</td><td class="p-4 text-gray-500">USD</td><td class="p-4 text-cyan-500 text-lg">6.1</td><td class="p-4 text-cyan-500 text-lg">10.7</td>
            </tr>
        </tbody>
    </table>
</div></div>`
        }
      ]
    },
    {
      cat: "Check-in Fees",
      subs: [
        {
          title: "Check-in Fees",
          content: `<div class="prose-block"><div class="prose-title">Check-In Costs</div>
<div class="overflow-x-auto custom-scroll mt-4">
    <table class="w-full text-center border-collapse">
        <thead>
            <tr class="dark:bg-black/30 bg-gray-100 text-[10px] uppercase font-black tracking-widest text-black dark:text-white border-b-2 border-cyan-500">
                <th class="p-4 text-left">POS</th>
                <th class="p-4">Currency</th>
                <th class="p-4">Airline</th>
                <th class="p-4">VAT Included</th>
                <th class="p-4 text-cyan-500">One Way</th>
                <th class="p-4 text-cyan-500">Round Trip</th>
            </tr>
        </thead>
        <tbody class="font-mono text-sm font-semibold divide-y dark:divide-white/5 divide-black/5 text-black dark:text-gray-300">
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td rowspan="2" class="p-4 text-left font-bold align-middle border-b dark:border-white/5 border-black/5">KSA</td>
                <td rowspan="2" class="p-4 text-gray-500 align-middle border-b dark:border-white/5 border-black/5">SAR</td>
                <td rowspan="2" class="p-4 text-gray-500 align-middle border-b dark:border-white/5 border-black/5">All Airlines</td>
                <td class="p-3"><span class="bg-emerald-500/10 text-emerald-500 font-black px-3 py-1 rounded-md">Y</span></td>
                <td class="p-3 font-bold text-cyan-500 text-lg">11.5</td>
                <td class="p-3 font-bold text-cyan-500 text-lg">18.4</td>
            </tr>
            <tr class="dark:bg-white/5 bg-black/5 border-b dark:border-white/5 border-black/5">
                <td class="p-3"><span class="bg-gray-500/10 text-gray-500 font-black px-3 py-1 rounded-md">N</span></td>
                <td class="p-3 font-bold text-gray-500">10.0</td>
                <td class="p-3 font-bold text-gray-500">16.0</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td rowspan="2" class="p-4 text-left font-bold align-middle border-b dark:border-white/5 border-black/5">Qatar</td>
                <td rowspan="2" class="p-4 text-gray-500 align-middle border-b dark:border-white/5 border-black/5">QAR</td>
                <td rowspan="2" class="p-4 text-gray-500 align-middle border-b dark:border-white/5 border-black/5">All Airlines</td>
                <td class="p-3"><span class="bg-emerald-500/10 text-emerald-500 font-black px-3 py-1 rounded-md">Y</span></td>
                <td class="p-3 font-bold text-cyan-500 text-lg">11.5</td>
                <td class="p-3 font-bold text-cyan-500 text-lg">18.4</td>
            </tr>
            <tr class="dark:bg-white/5 bg-black/5 border-b dark:border-white/5 border-black/5">
                <td class="p-3"><span class="bg-gray-500/10 text-gray-500 font-black px-3 py-1 rounded-md">N</span></td>
                <td class="p-3 font-bold text-gray-500">10.0</td>
                <td class="p-3 font-bold text-gray-500">16.0</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b dark:border-white/5 border-black/5">
                <td class="p-4 text-left font-bold align-middle">UAE</td>
                <td class="p-4 text-gray-500 align-middle">AED</td>
                <td class="p-4 text-gray-500 align-middle">All Airlines</td>
                <td class="p-3"><span class="bg-gray-500/10 text-gray-500 font-black px-3 py-1 rounded-md">N</span></td>
                <td class="p-3 font-bold text-gray-500">10.0</td>
                <td class="p-3 font-bold text-gray-500">16.0</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td rowspan="2" class="p-4 text-left font-bold align-middle border-b dark:border-white/5 border-black/5">Bahrain</td>
                <td rowspan="2" class="p-4 text-gray-500 align-middle border-b dark:border-white/5 border-black/5">BHD</td>
                <td rowspan="2" class="p-4 text-gray-500 align-middle border-b dark:border-white/5 border-black/5">All Airlines</td>
                <td class="p-3"><span class="bg-emerald-500/10 text-emerald-500 font-black px-3 py-1 rounded-md">Y</span></td>
                <td class="p-3 font-bold text-cyan-500 text-lg">1.2</td>
                <td class="p-3 font-bold text-cyan-500 text-lg">1.9</td>
            </tr>
            <tr class="dark:bg-white/5 bg-black/5 border-b dark:border-white/5 border-black/5">
                <td class="p-3"><span class="bg-gray-500/10 text-gray-500 font-black px-3 py-1 rounded-md">N</span></td>
                <td class="p-3 font-bold text-gray-500">1.0</td>
                <td class="p-3 font-bold text-gray-500">1.6</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td rowspan="2" class="p-4 text-left font-bold align-middle border-b dark:border-white/5 border-black/5">Oman</td>
                <td rowspan="2" class="p-4 text-gray-500 align-middle border-b dark:border-white/5 border-black/5">OMR</td>
                <td rowspan="2" class="p-4 text-gray-500 align-middle border-b dark:border-white/5 border-black/5">All Airlines</td>
                <td class="p-3"><span class="bg-emerald-500/10 text-emerald-500 font-black px-3 py-1 rounded-md">Y</span></td>
                <td class="p-3 font-bold text-cyan-500 text-lg">1.2</td>
                <td class="p-3 font-bold text-cyan-500 text-lg">1.9</td>
            </tr>
            <tr class="dark:bg-white/5 bg-black/5 border-b dark:border-white/5 border-black/5">
                <td class="p-3"><span class="bg-gray-500/10 text-gray-500 font-black px-3 py-1 rounded-md">N</span></td>
                <td class="p-3 font-bold text-gray-500">1.0</td>
                <td class="p-3 font-bold text-gray-500">1.6</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b dark:border-white/5 border-black/5">
                <td class="p-4 text-left font-bold align-middle">Kuwait</td>
                <td class="p-4 text-gray-500 align-middle">KWD</td>
                <td class="p-4 text-gray-500 align-middle">All Airlines</td>
                <td class="p-3"><span class="bg-gray-500/10 text-gray-500 font-black px-3 py-1 rounded-md">N</span></td>
                <td class="p-3 font-bold text-gray-500">0.8</td>
                <td class="p-3 font-bold text-gray-500">1.3</td>
            </tr>
            <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td rowspan="2" class="p-4 text-left font-bold align-middle">International</td>
                <td rowspan="2" class="p-4 text-gray-500 align-middle">USD</td>
                <td rowspan="2" class="p-4 text-gray-500 align-middle">All Airlines</td>
                <td class="p-3"><span class="bg-emerald-500/10 text-emerald-500 font-black px-3 py-1 rounded-md">Y</span></td>
                <td class="p-3 font-bold text-cyan-500 text-lg">3.1</td>
                <td class="p-3 font-bold text-cyan-500 text-lg">5.0</td>
            </tr>
            <tr class="dark:bg-white/5 bg-black/5">
                <td class="p-3"><span class="bg-gray-500/10 text-gray-500 font-black px-3 py-1 rounded-md">N</span></td>
                <td class="p-3 font-bold text-gray-500">2.7</td>
                <td class="p-3 font-bold text-gray-500">4.3</td>
            </tr>
        </tbody>
    </table>
</div></div>`
        }
      ]
    },
    {
      cat: "Penalties Type",
      subs: [
        {
          title: "Penalties Type",
          content: `<div class="prose-block"><div class="prose-title">1-Per Ticket (Transaction)</div><div class="prose-text">Apply the most restrictive (highest) penalty found among all fare bases on the ticket. Compare penalties for each fare component; charge only the single highest amount.
Example: Outbound = 100 SAR, Inbound = 200 SAR. Total to collect = 200 SAR.
Note: For EK-EY-PR, if TKTs are reissued, check original TKT fare and apply highest penalty.</div></div>
<div class="prose-block"><div class="prose-title">2-Per Fare Component (Direction)</div><div class="prose-text">Collect penalty for each fare component (outbound and inbound), regardless of stops/segments within that component.
Example: RT ticket with 4 segments. Component 1 = 100 SAR. Component 2 = 100 SAR. Total to collect = 200 SAR (100+100).</div></div>
<div class="prose-block"><div class="prose-title">3-Per Segment (Sector)</div><div class="prose-text">Collect penalty for every segment, sector, or coupon listed on the ticket. Multiply penalty amount by total number of flight segments.
Example: OW ticket with 2 segments. Seg 1 = 50. Seg 2 = 50. Total to collect = 100 SAR (50+50).</div></div>`
        }
      ]
    },
    {
      cat: "BSP Templates",
      subs: [
        {
          title: "BSP Templates",
          content: `<div class="prose-block"><div class="prose-title">Unused Tickets</div><pre id="bsp-unused-text" class="prose-text p-4 rounded font-mono border dark:border-white/5 border-black/5 dark:bg-black/30 bg-white/50">Order ID:
PNR:  
AL PNR:
Penalty:
Non-Refundable Taxes: 
Refund Amount:
Original Ticket Number:
Reissued Ticket Number (if any): 
Original issue Date & Time:   
VCC: CCAXXXXXXXXXXXX3715
Issuance Amount:</pre>
</div>
<div class="prose-block"><div class="prose-title">Partially Used Tickets</div><pre id="bsp-partial-text" class="prose-text p-4 rounded font-mono border dark:border-white/5 border-black/5 dark:bg-black/30 bg-white/50">Order ID:
PNR:
AL PNR:
Penalty:
Non-Refundable Taxes: 
Used Fare:
Used Taxes:
Refund Amount:
Original Ticket Number:
Reissued Ticket Number (if any): 
Original issue Date & Time: 
VCC:
Issuance Amount:</pre>
</div>
<div class="prose-block box-note"><div class="prose-title text-note">Protocols</div><div class="prose-text">The segments must be deleted from the PNR.
You have to mention the AL approval case if any.
For HR & GP, please always add the PNR history as a PDF.</div></div>`
        }
      ]
    },
    {
      cat: "Smart Flows",
      subs: [
        {
          title: "Smart flows",
          content: `<table class="prose-table">
<tr><th>Command</th><th>Usage Description</th></tr>
<tr><td class="font-mono text-cyan-500 font-bold whitespace-nowrap">FQP1 / FQD1 / FRN1</td><td>Get Fare rules using respective commands.</td></tr>
<tr><td class="font-mono text-cyan-500 font-bold whitespace-nowrap">GH1</td><td>Sell ghost segment for tickets.</td></tr>
<tr><td class="font-mono text-cyan-500 font-bold whitespace-nowrap">EMD1</td><td>Create EMD for tickets.</td></tr>
<tr><td class="font-mono text-cyan-500 font-bold whitespace-nowrap">FTJB1</td><td>Create EMD for tickets that contain (U) statuses.</td></tr>
<tr><td class="font-mono text-cyan-500 font-bold whitespace-nowrap">Send1</td><td>Skip pop-up errors.</td></tr>
<tr><td class="font-mono text-cyan-500 font-bold whitespace-nowrap">SVN1</td><td>Create SV EMD related to name correction.</td></tr>
</table>`
        }
      ]
    },
    {
      cat: "Touchless Profiles",
      subs: [
        {
          title: "Touchless Profiles",
          content: `<div class="w-full max-w-6xl mx-auto py-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h3 class="text-2xl font-black text-gray-800 dark:text-white tracking-tight mb-4">KSA</h3>
            <div class="space-y-3 font-mono text-xs">
                <div class="p-3 rounded-xl bg-gray-50/80 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-blue-500 block mb-1">Visa</span>
                    <code>CCVI (PDRA/U71D0X)</code>
                </div>
                <div class="p-3 rounded-xl bg-gray-50/80 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-teal-500 block mb-1">Amex</span>
                    <code>CCAX (PDRA/2RM8FA)</code>
                </div>
                <div class="p-3 rounded-xl bg-gray-50/80 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 block mb-1">Master</span>
                    <code>CCCA (PDRA/X0A1JW)</code>
                </div>
            </div>
        </div>
        <div class="bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h3 class="text-2xl font-black text-gray-800 dark:text-white tracking-tight mb-4">DXB</h3>
            <div class="space-y-3 font-mono text-xs">
                <div class="p-3 rounded-xl bg-gray-50/80 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-blue-500 block mb-1">Visa</span>
                    <code>CCVI (PDRA/FJH4YX)</code>
                </div>
                <div class="p-3 rounded-xl bg-gray-50/80 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-teal-500 block mb-1">Amex</span>
                    <code>CCAX (PDRA/EPU6SM)</code>
                </div>
                <div class="p-3 rounded-xl bg-gray-50/80 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 block mb-1">Master</span>
                    <code>CCCA (PDRA/X0A1JW)</code>
                </div>
            </div>
        </div>
        <div class="bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h3 class="text-2xl font-black text-gray-800 dark:text-white tracking-tight mb-4">KWI</h3>
            <div class="space-y-3 font-mono text-xs">
                <div class="p-3 rounded-xl bg-gray-50/80 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-blue-500 block mb-1">Visa</span>
                    <code>CCVI (PDRA/Z4B31W)</code>
                </div>
                <div class="p-3 rounded-xl bg-gray-50/80 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-teal-500 block mb-1">Amex</span>
                    <code>CCAX (PDRA/TJWXE5)</code>
                </div>
                <div class="p-3 rounded-xl bg-gray-50/80 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 block mb-1">Master</span>
                    <code>CCCA (PDRA/X0A1JW)</code>
                </div>
            </div>
        </div>
    </div>
</div>`
        }
      ]
    },
    {
      cat: "Void Rules",
      subs: [
        {
          title: "Void Rules",
          content: `<table class="prose-table">
<tr><th>Airlines / Market</th><th>Void Rule</th></tr>
<tr><td class="font-bold dark:text-white text-space-900">FZ, NE, MS, BS</td><td>Void within 24 Hours not allowed.</td></tr>
<tr><td class="font-bold dark:text-white text-space-900">SM</td><td>EGY Market Void not allowed.</td></tr>
<tr><td class="font-bold dark:text-white text-space-900">EK</td><td>Void within 1 Hour from Departure not allowed.</td></tr>
<tr><td class="font-bold dark:text-white text-space-900">A3</td><td>( P - U - T - S ) Classes are not voidable.</td></tr>
<tr><td class="font-bold dark:text-white text-space-900">RQ, R5</td><td>Void not Allowed.</td></tr>
<tr><td class="font-bold dark:text-white text-space-900">No-Show timeframe</td><td>NP, NE, MS, A3, FZ, SV, GF.</td></tr>
</table>
<p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Note: Always check fare rules to confirm if airline/Class are voidable.</p>`
        }
      ]
    }
  ],
  process: [
    {
      cat: "Check-in Case Procedures",
      subs: [
        {
          title: "Check-in Case Procedures",
          content: `<div class="prose-block"><div class="prose-title">CHECK-IN CASES</div><div class="prose-text">Check-In Done From Our Side - Not Sent to Customer
Add the BP on the files related to your case & not the parent case.
Case Closure Details:
• Cancellation Reason: Done, but not sent to Customer
• Case Status: Processed

[Note] We'll no longer close the case as "Incident". 
[Automated Action] This will result in an automated email being sent to the customer with the attached boarding pass.

Check-In Could Not Be Done From Our Side
If we couldn't do the Check-in from our side: We'll cancel the check-in OID and Refund the amount to the Customer from our side.
Case Closure Details:
• Cancellation Reason: Picked normally according to the failure reason
• Case Status: Processed
[Automated Action] This will result in an automated email being sent to the customer informing him that we'll refund the amount due to failure in the check-in process.

Confirmation Issued but Boarding Pass (BP) Not Issued
• Cancellation Reason: Confirmation Issued but Boarding Pass Not Issued
• Case Status: Processed</div></div>
<div class="prose-block"><div class="prose-title">CHECK-IN AMENDMENT CASES</div><div class="prose-text">Check-In Not Available Due to Missing Documents
In cases where check-in could not proceed due to documents issues: Verify if correct documents are attached to the case, proceed check-in correctly, avoid any issues.

Chargeable Seat Selected - Check-In Not Completed
If a chargeable seat has been selected and the check-in is not completed:
• Case Status: Incident
• Cancellation Reason: None (without "Cancellation Reason")
[Reason] As the MU for the seat has already been collected. 
[Purpose] To inform the customer that the check-in isn't done.</div></div>
<div class="prose-block box-note"><div class="prose-title text-note">CANCELLATION CASES | CHECK-IN OID UPDATE</div><div class="prose-text">[Notice] From now on, you don't have to change the "Check-In OID" to "Don't Fulfill" for the Cancellation cases.</div></div>`
        }
      ]
    },
    {
      cat: "HUB Issuance",
      subs: [
        {
          title: "HUB Issuance",
          content: `<div class="prose-block"><div class="prose-title">ISSUING TICKETS DIRECTLY FROM HUB</div><div class="prose-text">Direct Issuance Feature
Issue any TKTs directly from HUB from the Search Flights button as long as you have the amount in the Sale ID.

Benefits & Use Cases
You can use this to easily issue LCC bookings from it to avoid the double work on the booking:
• Manually issuing the booking on the Portal
• Then Manually adding all details on HUB

Applicable Scenarios
• In any Failed booking on LCC bookings
• Void and Issue on LCC bookings</div></div>`
        }
      ]
    },
    {
      cat: "The Touchless Process",
      subs: [
        {
          title: "The Touchless process",
          content: `<div class="prose-block"><div class="prose-title">QUEUE PNRs TO TOUCHLESS | FXQ SCENARIOS</div><div class="prose-text">Touchless Queue Requirement
QUEUE PNRs to Touchless as long as using FXQ, even in the following scenarios:
• TST non guaranteed
• TST with zero amount
• Galileo PNRs and the amendment done on GDS</div></div>
<div class="prose-block"><div class="prose-title">MANUAL ISSUANCE | ALLOWED CASES</div><div class="prose-text">Manual issuance is only allowed in the following two cases:
• Involuntary changes
• Name corrections</div></div>`
        }
      ]
    },
    {
      cat: "Auto Confirm Cases",
      subs: [
        {
          title: "Auto Confirm Cases",
          content: `<div class="prose-block"><div class="prose-title">AUTO CONFIRM CASES | MANDATORY VERIFICATION</div><div class="prose-text">Verification Requirement:
[Mandatory] It is mandatory to check all details in Auto Confirm cases on HUB and compare it with the issued ticket.
[Purpose] This process is urgently to avoid any discrepancies or errors arising from touchless processing or HUB.
Details to Verify: Fraud flag, Booking Data, Passengers names, Booking date and time, Classes of service, Baggage allowance (main baggage - additional baggage).
Actions for Discrepancies: 
Any discrepancies on booking should take the necessary action according to each case: Void and rebook, Create a case for CS, Add baggage of LCC booking in case of non-voidable.</div></div>
<div class="prose-block"><div class="prose-title">FRAUD FLAG PROCESS</div><div class="prose-text">Verification Steps:
Step 1 | Traveler Name vs Account Holder Name. Result: (Auto Cleared)
Step 2 | Cardholder Name vs Traveler/Account Holder Name. Result: (Auto Cleared)
Step 3 | Previous Bookings & Phone Verification. We will also use "Truecaller" to verify the client's phone number and identity.
Step 4 | Card Issued Outside Middle East. Exclude cards from outside the Middle East. 
Any card issued outside the Middle East and used for the first time will be marked as manual documentation (Man Doc).
</div></div>
<div class="mt-4 mb-2">
    <div class="text-[10px] uppercase font-black tracking-[0.2em] text-cyan-500 mb-3">Auto Cleared List (ACL)</div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div class="dark:bg-white/5 bg-black/5 p-3 rounded-xl border dark:border-white/5 border-black/5 text-xs font-bold text-center">Tabby</div>
        <div class="dark:bg-white/5 bg-black/5 p-3 rounded-xl border dark:border-white/5 border-black/5 text-xs font-bold text-center">Tamara</div>
        <div class="dark:bg-white/5 bg-black/5 p-3 rounded-xl border dark:border-white/5 border-black/5 text-xs font-bold text-center">3D Secure</div>
        <div class="dark:bg-white/5 bg-black/5 p-3 rounded-xl border dark:border-white/5 border-black/5 text-xs font-bold text-center">Apple Pay</div>
        <div class="dark:bg-white/5 bg-black/5 p-3 rounded-xl border dark:border-white/5 border-black/5 text-xs font-bold text-center">Benefit Pay</div>
        <div class="dark:bg-white/5 bg-black/5 p-3 rounded-xl border dark:border-white/5 border-black/5 text-xs font-bold text-center">Knet</div>
        <div class="dark:bg-white/5 bg-black/5 p-3 rounded-xl border dark:border-white/5 border-black/5 text-xs font-bold text-center">Qitaf</div>
        <div class="dark:bg-white/5 bg-black/5 p-3 rounded-xl border dark:border-white/5 border-black/5 text-xs font-bold text-center">Wallet Points</div>
        <div class="col-span-2 md:col-span-4 dark:bg-white/5 bg-black/5 p-3 rounded-xl border dark:border-white/5 border-black/5 text-xs font-bold text-purple-400 text-center">Mada Bin 506968 (Apple Pay Master Card)</div>
    </div>
    <div class="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-semibold text-red-500">
        <span class="font-black uppercase tracking-widest block mb-1">Fraud Trend Warning</span>
        Some of these payment methods periodically become fraud trends. Always check recent fraud alerts and emails before blindly clearing!
    </div>
</div>`
        }
      ]
    },
    {
      cat: "Tabby",
      subs: [
        {
          title: "Tabby",
          content: `<div class="prose-block"><div class="prose-title">TABBY FEES | VOID & CANCELLATION RULES</div><div class="prose-text">Scenario 1 | Void & Rebook OR Cancel & Rebook
If the customer contacted us asking to Void & Rebook OR to Cancel & Rebook:
• The whole amount of Tabby fees will be Non-Refundable
[P.S.] The Rebooking will be done with us using the refund amount.

Scenario 2 | Void & Refund OR Cancel & Refund
If the customer contacted us asking to Void & Refund OR to Cancel & Refund:
• Tabby will be deducted with a percentage
[P.S.] There will be a refund which will be initiated on the Unify.</div></div>`
        }
      ]
    },
    {
      cat: "Floor Process",
      subs: [
        {
          title: "Floor Process",
          content: `<div class="prose-block"><div class="prose-title">FLOOR PROCESSES & CONDUCT GUIDELINES</div><div class="prose-text">Overview
To ensure smooth operations and a positive working environment, please review the following floor processes and conduct guidelines that we all need to follow moving forward:</div></div>
<div class="prose-block"><div class="prose-title">BREAKS POLICY</div><div class="prose-text">Daily Break Entitlement
Agents are entitled to a 1 hour break per day.

Exceeding break will result in the below:
1st time: 5% deduction from the KPIs "Productivity"
2nd time: 15% deduction from the KPIs "Productivity"
3rd time: Warning Letter
4th time: Will be submitted to an HR Investigation

Break Issue Submission
For any issues to be submitted in the form on the same day, up to only 2 issues per month. Any more than this will not be counted unless verified by a leader.

Break AUX Requirements
Agent's are not allowed to leave the floor without changing their AUX to "Break". The Shift leader needs to be aware that you're on Break.
Prayer & Bathroom Breaks Exception: Only Prayer & Bathroom breaks can be with "In a Meeting" AUX to be approved by the Shift Leader before leaving the floor.</div></div>
<div class="prose-block"><div class="prose-title">WORKPLACE ENVIRONMENT</div><div class="prose-text">AC Temperature Policy
The AC setting will remain at a neutral level. Adjustments will only be made if all affected team members agree to the change.

Respect & Professionalism
We are one team and a work family. Respect and professionalism are expected at all times:
• Raising voices, showing disrespect, or engaging in conflict will not be tolerated.
• If an issue arises, escalate it directly to your Team Lead to be resolved appropriately.

Consequences for Misconduct:
1st time: Coaching
2nd time: Warning Letter, which will affect the Quarter bonus & the appraisal
3rd time: HR Investigation which may lead to termination</div></div>`
        }
      ]
    },
    {
      cat: "Transfer Cases",
      subs: [
        {
          title: "Transfer cases",
          content: `<div class="prose-block"><div class="prose-title">CASE TRANSFER PROTOCOL | IMPORTANT NOTICE</div><div class="prose-text">Incorrect Transfer Policy
Unfortunately there will be no more consideration regarding any Incorrect transfer for SF case such as: Transfer to another agent, Transfer to queue, Kickback to requester, Transfer to pending.
Without mentioning a valid reason, or mentioning if it is advised by TL with a name.
[Consequence] Otherwise, the Case will be scored down as a Fatal same as usual.</div></div>
<div class="prose-block"><div class="prose-title">TRANSFER TO OWNER | POLICY UPDATE</div><div class="prose-text">No Transfer to Owner Rule
Please be advised right now no more cases to be transferred to the owner as long as you received the case from the avail, you must take the action from your end.

Violation Consequence
Please be advised if any case has been transferred to owner, this will be considered as: Violation of the floor process, Will be flagged as abusing, Leads to deduction 5% from your KPIs.</div></div>
<div class="prose-block box-warning"><div class="prose-title text-warning">VALID TRANSFER EXCEPTIONS</div><div class="prose-text">Allowed Scenarios for Transfer to Owner
Only in the following cases it's valid to be transferred to you again:
• You are in meeting and working on case, then received a post and case has been kicked back to another agent
• Touchless failed cases
• LCC refund cases</div></div>`
        }
      ]
    },
    {
      cat: "Chargeback Booking",
      subs: [
        {
          title: "Chargeback Booking",
          content: `<div class="prose-block"><div class="prose-title">Chargeback Overview</div><div class="prose-text">There are two types of Chargeback:
1. Chargeback for Fraud Bookings: the original cardholder claims that these transactions were made fraudulently without authorization.
2. Chargeback for Services was not provided: the customer claimed their booking, refund, or any other services were not processed.
Please make sure to follow the below based on the Chargeback type and always select the "From" while replying on Salesforce as "fft.chargeback@almosafer.com"</div></div>
<div class="prose-block"><div class="prose-title">1) Chargeback for Fraud Bookings</div>
<table class="prose-table">
<tr><th>Chargeback Source</th><th>Via Bank</th></tr>
<tr><td>Used or Not Used</td><td>Screenshot from the GDS/Airline system required showing the ticket status.<br>(Give a clear explanation about the status of the ticket, as they are not experts on Air process)</td></tr>
<tr><td>If Ticket Not Used</td><td>Send to the airline to get full refund approval (Attach Chargeback Email)</td></tr>
<tr><td>Cancelled Bookings</td><td>Screenshot showing cancellation policy required</td></tr>
<tr><td>Ticket Status Reissued</td><td>Provide new ticket details</td></tr>
<tr><td>Refund Process</td><td>Refund via GDS only After Confirmation</td></tr>
<tr><td>If Refund Rejected</td><td>Create Refund Request Before Receiving Chargeback (Verification Failed Status)<br>(If the Booking Status is Chargeback, no refund request is to be created)</td></tr>
</table></div>
<div class="prose-block"><div class="prose-title">2) Chargeback for Services was not provided</div>
<div class="overflow-x-auto custom-scroll"><table class="prose-table min-w-[600px]">
<tr><th>Chargeback Source</th><th>Via Tamara</th><th>Via Bank</th></tr>
<tr><td>Used or Not Used</td><td colspan="2">Screenshot from the GDS/Airline system required showing the ticket status.<br>(Give a clear explanation about the status of the ticket, as they are not experts on Air process)</td></tr>
<tr><td>If Ticket Not Used</td><td colspan="2">Check if the airline can cancel & refund</td></tr>
<tr><td>Cancelled Bookings</td><td colspan="2">Screenshot showing cancellation policy required</td></tr>
<tr><td>Ticket Status Reissued</td><td colspan="2">Provide new ticket details</td></tr>
<tr><td>No-show Cases</td><td colspan="2">Screenshot showing the airline fare policy required</td></tr>
<tr><td>Duplicated Booking/ Flight Delays</td><td colspan="2">Send to the airline to get full refund approval (Attach Chargeback Email)</td></tr>
<tr><td>Cancel via AL / Credit Shell</td><td colspan="2">Send to the airline to get full refund approval (Attach Chargeback Email)</td></tr>
<tr><td>Refund Process</td><td>Refund GDS & HUB After Confirmation</td><td>Refund via GDS only After Confirmation</td></tr>
<tr><td>If the Refund Request is Rejected (Refund Request on HUB)</td><td>Create Another Refund Request</td><td>Create Refund Request Before Receiving Chargeback (Verification Failed Status)<br>(If the Booking Status is Chargeback, no refund request is to be created)</td></tr>
</table></div></div>`
        }
      ]
    },
    {
      cat: "Failed Process & Manual Queue",
      subs: [
        {
          title: "General Rules",
          content: `<div class="prose-block"><div class="prose-title">GDS Failed Cases - General Rules</div><div class="prose-text">For Failed cases, whenever you create a new PNR you need to add it on HUB.
For Failed bookings, if the new class results in a baggage upgrade, we'll not create a new OID with the new baggage.
For the Alternative cases in Failed bookings, the loss should be counted from the new created OID.
Any UC segments or HX in failed cases must be a commercial loss supplier issue.</div></div>
<div class="prose-block"><div class="prose-title">Visa Issues & Class Upgrade</div><div class="prose-text">For Visa issues, the E-Ticket in HUB and Almosafer website shows visas may be available with the passenger, and if there's a loss should be retention.
If the booked flight class is not available and we upgrade the class in the same cabin, this is a product loss normally, as already there's no issue with the entire flight.</div></div>
<div class="prose-block"><div class="prose-title">ALT Rules & Verification</div><div class="prose-text">[Important] ALT shouldn't exceed 50% from the Total booking value.
If more than 50%, FFT agent should check with the available Leader before offering the ALT to the CS.
Before sending ALT to the CS, FFT agent should check all the possible ways to issue the original booking:
• GDS availability
• SOTO availability
• Issue on the airline website</div></div>
<div class="prose-block box-critical"><div class="prose-title text-critical">Issuance Protocol - Touchless Requirement</div><div class="prose-text">All issuance should go through touchless even if the case fails.
We have to fix the failure then send it back again to touchless.

TTP Issuance - TST Indicator Rule
In case of outage or any other scenario requiring TTP, please make sure that TST indicator is guaranteed.
[Critical] We are not allowed to issue non-guaranteed TST under any circumstances.
[Warning] Any ADM will be received for issuing non-guaranteed TST would be debited to the issuer.</div></div>`
        },
        {
          title: "SV ISSUANCE CASES | MANUAL QUEUE",
          content: `<div class="prose-block"><div class="prose-title">Overview</div><div class="prose-text">We'll be receiving issuance cases on SV on the manual Queue. Please adhere to the below guidelines.

HUB Status: We'll NOT change the Status on HUB to "Auto Confirm Queue".
Pricing: We'll price it manually on GDS with the Fare Family according to the baggage allowance on HUB.
Issuance & Documentation: We'll issue the PNRs through Touchless. Update the HUB as "Manually Confirmed".

Baggage Verification
[Important] We have to make sure that the issued TKT is the same baggage allowance as on HUB.</div></div>`
        }
      ]
    },
    {
      cat: "Robot Triggers",
      subs: [
        {
          title: "Triggers & Actions",
          content: `<div class="prose-block"><div class="prose-title">LCC Portals - Triggerable Options</div>
<table class="prose-table">
<tr><th>Airline</th><th>Amendment</th><th>Baggage</th></tr>
<tr><td>Fly Dubai</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Air Arabia</td><td>Yes</td><td>No</td></tr>
<tr><td>flyadeal</td><td>Yes</td><td>No</td></tr>
<tr><td>flynas</td><td>Yes</td><td>Yes</td></tr>
</table></div>
<div class="prose-block"><div class="prose-title">Amadeus - Triggerable Actions</div><div class="prose-text">Normal Amend
Void and Issue
Split Void and Issue
Reissue Ticket with FoC
Minor SCH</div></div>`
        },
        {
          title: "Rules & Losses",
          content: `<div class="prose-block"><div class="prose-title">Price Breakdown - Important Rule</div><div class="prose-text">[Important] Make sure to change the field "Price Breakdown" to the amount paid by the customer minus the MOS fee, before triggering any LCC cases to robot, to avoid closing the OID with a wrong amount.</div></div>
<div class="prose-block"><div class="prose-title">Loss Documentation Process</div><div class="prose-text">If there's a loss, we'll add the amount paid on HUB after removing the ALM fee ("50 SAR or the 40.25 SAR"), and update the loss on the case normally.
[Note] Make sure to document the OID manually when the robot fails.</div></div>`
        }
      ]
    },
    {
      cat: "Quality, Risk & Losses",
      subs: [
        {
          title: "Quality",
          content: `<div class="prose-block box-critical"><div class="prose-title text-critical">FATAL ERRORS & QUALITY SCORING GUIDELINES</div><div class="prose-text">Actions Leading to Loss / Fatal Errors:
• Closed case without any action
• Notes not documented on Hub & Salesforce
• Fraud flag not checked
• Ticket number not updated in HUB
• State of the booking has not changed in HUB to Complete
• EMD for baggage not documented in the hub
• Breakdown Didn't send by typing for retail booking - send screenshot only
• The case was kicked back without valid reason
• Baggage allowance is not updated correctly
• The loss amount wasn't updated or updated incorrectly
• The deal amount wasn't updated
• Incorrect refund method
• Ticket not sent from unify (excluding auto confirm)
• Wrong flight number provided in the new booking
• Didn't kick back the case to the CS to define the refund method since there is a variance between the case field and the case description
• Wrong advice
• Didn't update the correct issuing office on the hub
• Didn't change the status of OID to manually confirmed
• Didn't trigger amendment GDS & LCC to robot to document on HUB</div></div>`
        },
        {
          title: "Losses",
          content: `<div class="prose-block"><div class="prose-title">MOST COMMON REASONS LEAD TO LOSSES</div><div class="prose-text">Failed Cases:
• Should be the same Time & Date as HUB
• Should be the same as baggage allowance
• Should be the same Traveler name
• Should update the correct PNR in LCC booking

Amendment Cases:
• Should make sure to amend on the new flight, and description matches attached
• Should make sure that there is no SPLITTED PNR on booking
• Should make sure all TICKETS are issued
• Should make sure for any reissue in NDC and PNR includes more than one pax, issue each pax separately

Cancellation Cases:
• Check if tickets are refunded on GDS
• In NDC VOID, confirm ticket is voided
• Apply most restrictive penalty only on separate tickets RT. Mark other penalty as Product Loss.</div></div>`
        },
        {
          title: "ADM",
          content: `<div class="prose-block"><div class="prose-title">AIRLINE-SPECIFIC ADM GUIDELINES</div><div class="prose-text">Always check fare rules carefully before executing refunds or reissues.
Non-Voidable Airlines in No-Show Time Frame: NP, NE, MS, A3, FZ, SV, GF.
Guaranteed Reissues & Refunds: Follow ONLY the list of airlines that implemented Reissues/Refunds ATC on Amadeus (FQNATC/CXR).</div></div>`
        }
      ]
    }
  ]
};
