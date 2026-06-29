async function checkPostgres() {
  const nodeEnvDatabase =
    process.env.NODE_ENV === "test"
      ? "tests"
      : process.env.NODE_ENV === "development"
        ? "development"
        : undefined;

  if (!nodeEnvDatabase) {
    console.log("🔴 Ambiente inválido.");
    return;
  }

  const proc = Bun.spawn(
    [
      "docker",
      "exec",
      `prato-feito-${nodeEnvDatabase}-database-1`,
      "pg_isready",
      "--host",
      "localhost",
    ],
    {
      stdout: "pipe",
      stderr: "pipe",
    },
  );

  const stdoutText = await proc.stdout.text();

  if (!stdoutText.toString().includes("accepting connections")) {
    process.stdout.write(".");
    checkPostgres();
    return;
  }

  console.log("\n🟢 Postgres está pronto e aceitando conexões.\n");
}

process.stdout.write("\n \n🔴 Aguardando Postgres aceitar conexões");
checkPostgres();
