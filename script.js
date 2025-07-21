const claw = document.getElementById("claw");
    const dollArea = document.getElementById("doll-area");
    const machine = document.getElementById("machine");
    let dolls = document.querySelectorAll(".doll:not(.secret)");
    let allDolls = document.querySelectorAll(".doll");
    let secret = document.querySelector(".secret");
    let grabbed = 0;
    let position = 42; // in %

    const messages = [
      "ได้ไอ้นนแอคจัด 20% 🧸 <hr> <i>(ของขวัญจากพระเจ้า)</i>",
      "ไอ้นนถือธง 15% 🐻 <hr> <i>(รักชาติแค่ไหน ก็ไม่เท่ารักเธอ)</i>",
      "ไอ้นนเนิร์ด 25% 🤓 <hr> <i>(IQ สูงแต่อยากโดนตีหัวด้วยรัก)</i>",
      "ไอ้นนแว่น 30% 🤓💘 <hr> <i>(หล่อจัดจนขอรูปนี้เก็บไว้บูชา)</i>",
      "ไอ้นนเด็ก 10% 👶💖 <hr> <i>(ของลับแห่งจักรวาล คีบติดคือฟ้าประทาน)</i>"
    ];

    function moveClaw(direction) {
      if (direction === "left" && position > 5) position -= 12;
      if (direction === "right" && position < 75) position += 12;
      claw.style.left = position + "%";
    }

    function dropClaw() {
      const clawCenter = (position / 100) * machine.clientWidth + claw.clientWidth / 2;
      let hit = false;

      dolls.forEach((doll) => {
        const dollLeft = parseFloat(doll.style.left);
        const dollCenter = (dollLeft / 100) * machine.clientWidth + doll.clientWidth / 2;

        if (Math.abs(clawCenter - dollCenter) < 40 && !hit) {
          hit = true;

          const successChance = 0.2;
          if (Math.random() <= successChance) {
            const imageSrc = doll.src;
            doll.style.transform = "translateY(-150px)";
            setTimeout(() => {
              doll.remove();
              dolls = document.querySelectorAll(".doll:not(.secret)");
              Swal.fire({
                title: "ได้แล้วเก่งที่สุดอ่ะ 💞",
                html: messages[grabbed],
                imageUrl: imageSrc,
                imageWidth: 100,
                imageHeight: 100,
                confirmButtonText: "โคตรเก่งอ่ะ",
                customClass: {
                  image: "rounded-image",
                },
              });
              grabbed++;
              if (grabbed === 4 && secret) secret.style.display = "block";
              if (dolls.length === 0 && (!secret || !document.body.contains(secret))) askResetGame();
            }, 500);
          } else {
            Swal.fire({
              title: "แง คีบโดนแต่ไม่ติด 😥",
              text: "อีกนิดเดียวเอง ลองใหม่น้าาา 💪",
              icon: "error",
              confirmButtonText: "ลองใหม่!",
            });
          }
        }
      });

      // Secret doll
      if (!hit && secret && secret.style.display !== "none") {
        const dollLeft = parseFloat(secret.style.left);
        const dollCenter = (dollLeft / 100) * machine.clientWidth + secret.clientWidth / 2;

        if (Math.abs(clawCenter - dollCenter) < 40) {
          hit = true;
          const successChance = 0.8;
          if (Math.random() <= successChance) {
            secret.style.transform = "translateY(-150px)";
            setTimeout(() => {
              secret.remove();
              secret = null;
              Swal.fire({
                title: "เจอตัวลับแล้ววว 🎉",
                html: messages[grabbed],
                imageUrl: "image/kid.jpg",
                imageWidth: 120,
                imageHeight: 120,
                confirmButtonText: "รักหนูที่สุดเลย 💞",
                customClass: {
                  image: "rounded-image",
                },
              });
              grabbed++;
              if (dolls.length === 0) askResetGame();
            }, 500);
          } else {
            Swal.fire({
              title: "เกือบแล้ว! 😮‍💨",
              text: "คีบใกล้ตัวลับมาก ลองใหม่นะ!",
              icon: "info",
              confirmButtonText: "ลองอีกที!",
            });
          }
        }
      }

      // Missed everything
      if (!hit) {
        Swal.fire({
          title: "แง คีบไม่โดน 😢",
          text: "เอาใหม่อีกทีเนอะ 💪",
          icon: "error",
          confirmButtonText: "สู้ต่อ!",
        });
      }
    }
function askResetGame() {
  const audio = document.getElementById("anniversary-audio");
  if (audio) {
    audio.currentTime = 0;  // รีเซ็ตเสียง
    audio.play();
  }

  Swal.fire({
    title: "สุขสันต์ครบรอบ 7 เดือนนะคะคนเก่ง 💘",
    html: `
      <p style="font-size: 1.1em;">
        7 เดือนที่ผ่านมาเค้าภูมิใจในตัวเธอมากนะ 💞<br><br>
        ขอบคุณที่อยู่ข้างๆ ตลอดมา ไม่ว่าจะวันดีหรือวันพังๆ<br>
        เค้าโชคดีมากเลยที่ได้คบกับเธอ เค้ารักเธอมากนะคะ<br><br>
        อยากเล่นอีกมั้ยคนเก่งงง
      </p>
    `,
    imageUrl: "image/kid.jpg",
    imageWidth: 150,
    imageHeight: 150,
    imageAlt: "ครบรอบของเรา",
    showCancelButton: true,
    confirmButtonText: "เริ่มเล่นเกมใหม่ 💞",
    cancelButtonText: "ขอซึ้งแป๊บนึง 🥺",
    customClass: {
      popup: "sweet-anniversary-popup",
      image: "rounded-image"
    }
  }).then((result) => {
    if (audio) audio.pause();
    if (result.isConfirmed) resetGame();
  });
}


    function resetGame() {
      grabbed = 0;
      position = 42;
      claw.style.left = position + "%";
      allDolls.forEach((doll) => doll.remove());

      const dollImages = [
        { src: "image/ew.jpg", left: "3%" },
        { src: "image/flag.jpg", left: "25%" },
        { src: "image/nerd.jpg", left: "48%" },
        { src: "image/glass.jpg", left: "70%" },
      ];

      dollImages.forEach((dollData) => {
        const img = document.createElement("img");
        img.src = dollData.src;
        img.className = "doll";
        img.style.left = dollData.left;
        dollArea.appendChild(img);
      });

      const secretImg = document.createElement("img");
      secretImg.src = "image/kid.jpg";
      secretImg.className = "doll secret";
      secretImg.style.left = "50%";
      secretImg.style.display = "none";
      dollArea.appendChild(secretImg);

      dolls = document.querySelectorAll(".doll:not(.secret)");
      allDolls = document.querySelectorAll(".doll");
      secret = document.querySelector(".secret");
    }

    // Floating hearts
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.style.left = Math.random() * machine.clientWidth + "px";
      heart.style.bottom = "0px";
      machine.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, 700);