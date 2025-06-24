function showSection(section) {
    document.getElementById('budget').style.display = 'none';
    document.getElementById('change').style.display = 'none';
    document.getElementById('loan').style.display = 'none';
    document.getElementById(section).style.display = 'block';
}

// งบประมาณ
function calcBudget() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const expense = parseFloat(document.getElementById('expense').value) || 0;
    const remain = income - expense;
    let msg = '';
    if (remain > 0) {
        msg = `เงินเหลือเก็บ: ${remain.toLocaleString()} บาท`;
    } else if (remain === 0) {
        msg = 'เงินพอดี ไม่มีเหลือเก็บ';
    } else {
        msg = `เงินไม่พอ ขาด: ${Math.abs(remain).toLocaleString()} บาท`;
    }
    document.getElementById('budgetResult').innerText = msg;
}

// เงินทอน
function calcChange() {
    const price = parseFloat(document.getElementById('price').value) || 0;
    const paid = parseFloat(document.getElementById('paid').value) || 0;
    const change = paid - price;
    let msg = '';
    if (change > 0) {
        msg = `เงินทอน: ${change.toLocaleString()} บาท`;
    } else if (change === 0) {
        msg = 'จ่ายพอดี ไม่มีเงินทอน';
    } else {
        msg = `เงินไม่พอ ขาด: ${Math.abs(change).toLocaleString()} บาท`;
    }
    document.getElementById('changeResult').innerText = msg;
}

// ผ่อนจ่าย/ดอกเบี้ย (คำนวณแบบเงินต้นคงที่)
function calcLoan() {
    const amount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const rate = parseFloat(document.getElementById('interestRate').value) || 0;
    const months = parseInt(document.getElementById('months').value) || 1;
    if (amount <= 0 || months <= 0) {
        document.getElementById('loanResult').innerText = 'กรุณากรอกข้อมูลให้ครบถ้วน';
        return;
    }
    const monthlyInterest = (amount * (rate/100)) / 12;
    const monthlyPrincipal = amount / months;
    const monthlyPayment = monthlyPrincipal + monthlyInterest;
    const totalPayment = monthlyPayment * months;
    const totalInterest = monthlyInterest * months;
    let msg = `ผ่อนชำระต่อเดือน ≈ ${monthlyPayment.toLocaleString(undefined, {maximumFractionDigits:2})} บาท
รวมจ่ายทั้งหมด ≈ ${totalPayment.toLocaleString(undefined, {maximumFractionDigits:2})} บาท
ดอกเบี้ยรวม ≈ ${totalInterest.toLocaleString(undefined, {maximumFractionDigits:2})} บาท`;
    document.getElementById('loanResult').innerText = msg;
}
