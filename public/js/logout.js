const logout = async () => {
  try {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      console.log(response);
    }
  } catch {
    console.log("fail");
    alert("Failed to log out.");
  }
};

document.querySelector("#logout").addEventListener("click", logout);
