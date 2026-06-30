def classify_ticket(subject, description):

    text = (subject + " " + description).lower()

    category = "General"

    priority = "Low"

    summary = description[:80]

    confidence = 80.00


    if "vpn" in text:

        category = "IT Support"
        priority = "High"
        summary = "VPN connectivity issue."
        confidence = 96.5


    elif "password" in text:

        category = "IT Support"
        priority = "Medium"
        summary = "Password reset request."
        confidence = 94.2


    elif "laptop" in text:

        category = "IT Support"
        priority = "High"
        summary = "Laptop hardware/software issue."
        confidence = 95.7


    elif "leave" in text:

        category = "HR"
        priority = "Medium"
        summary = "Employee leave request."
        confidence = 92.4


    elif "salary" in text or "payroll" in text:

        category = "Finance"
        priority = "High"
        summary = "Payroll related issue."
        confidence = 95.0


    return {

        "category": category,

        "priority": priority,

        "summary": summary,

        "confidence": confidence

    }