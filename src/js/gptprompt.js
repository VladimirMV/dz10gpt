const prompt = "Give basic information about Ukraine";

fetch("https://api.openai.com/v1/engine/ID/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "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",
  },
  body: JSON.stringify({
    prompt: prompt,
    max_tokens: 5,
  }),
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.choices[0].text);
  })
  .catch((error) => {
    console.log(error);
  });