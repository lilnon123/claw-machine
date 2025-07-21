let claw = document.querySelector(".claw");
let dolls = document.querySelectorAll(".doll:not(.secret)");
let dollArea = document.getElementById("doll-area");
let allDolls = document.querySelectorAll(".doll");
let secret = document.querySelector(".secret");
let grabbed = 0;

let position = 135;
let messages = [
  "ได้ไอ้นนแอคจัด 20% 🧸 <hr> <i>(ของขวัญจากพระเจ้า)</i>",
  "ไอ้นนถือธง 15% 🐻 <hr> <i>(รักชาติปะวะ หรือรักแค่รูปนี้)</i>",
  "ไอ้นนเนิร์ด 25% 🤓 <hr> <i>(IQ สูงแต่อยากโดนตีหัวด้วยรัก)</i>",
  "ไอ้นนแว่น 30% 🤓💘 <hr> <i>(หล่อจัดจนขอรูปนี้เก็บไว้บูชา)</i>",
  "ไอ้นนเด็ก 10% 👶💖 <hr> <i>(ของลับแห่งจักรวาล คีบติดคือฟ้าประทาน)</i>"
];


function moveClaw(direction) {
  if (direction === "left" && position > 35) position -= 50;
  if (direction === "right" && position < 235) position += 50;
  claw.style.left = position + "px";
}
g
function dropClaw() {
  const clawCenter = position + 25;
  let hit = false;

  // คีบตุ๊กตาธรรมดา
  dolls.forEach((doll) => {
    if (!doll) return;
    const dollLeft = parseInt(doll.style.left);
    const dollCenter = (dollLeft / 100) * 320 + 30;

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
            imageAlt: "รูปที่คีบได้",
            confirmButtonText: "โคตรเก่งอ่ะ",
            customClass: {
              image: "rounded-image",
            },
          });

          grabbed++;

          if (grabbed === 4 && secret) {
            secret.style.display = "block";
          }

          if (dolls.length === 0) {
            if (secret && secret.style.display === "none") {
              secret.style.display = "block";
            } else if (!secret || !document.body.contains(secret)) {
              askResetGame();
            }
          }
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

  // คีบตุ๊กตาลับ
  if (
    !hit &&
    secret &&
    document.body.contains(secret) &&
    secret.style.display !== "none"
  ) {
    const dollLeft = parseInt(secret.style.left);
    const dollCenter = (dollLeft / 100) * 320 + 30;

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

          if (dolls.length === 0) {
            if (!secret || !document.body.contains(secret)) {
              askResetGame();
            }
          }
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

  // ไม่โดนอะไรเลย
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
  Swal.fire({
    title: "ตุ๊กตาหมดแล้ว 🎉",
    text: "อยากเล่นใหม่ไหม?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "เริ่มใหม่",
    cancelButtonText: "ไม่เป็นไร",
  }).then((result) => {
    if (result.isConfirmed) {
      resetGame();
    }
  });
}

function resetGame() {
  grabbed = 0;
  position = 135;
  claw.style.left = position + "px";

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
