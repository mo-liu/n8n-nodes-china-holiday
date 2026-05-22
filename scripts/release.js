const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const currentVersion = pkg.version;

function run(cmd) {
	return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' }).trim();
}

function ask(question) {
	return new Promise((resolve) => {
		const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer.trim());
		});
	});
}

(async () => {
	console.log(`当前版本: ${currentVersion}`);
	console.log('');
	console.log('请选择版本升级类型:');
	console.log('  1) patch     (1.0.0 → 1.0.1)  补丁版本，修复 bug');
	console.log('  2) minor     (1.0.0 → 1.1.0)  次版本，新增功能');
	console.log('  3) major     (1.0.0 → 2.0.0)  主版本，不兼容更新');
	console.log('  4) 自定义版本号');
	console.log('');

	const choice = await ask('输入选项 (1/2/3/4): ');

	let nextVersion;
	const parts = currentVersion.split('.').map(Number);

	switch (choice) {
		case '1':
			nextVersion = `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
			break;
		case '2':
			nextVersion = `${parts[0]}.${parts[1] + 1}.0`;
			break;
		case '3':
			nextVersion = `${parts[0] + 1}.0.0`;
			break;
		case '4':
			nextVersion = await ask(`输入新版本号 (当前: ${currentVersion}): `);
			if (!nextVersion) process.exit(1);
			break;
		default:
			console.log('无效选项');
			process.exit(1);
	}

	console.log(`\n即将发布: ${currentVersion} → ${nextVersion}`);

	const confirm = await ask('确认? (y/n): ');
	if (confirm.toLowerCase() !== 'y') {
		console.log('已取消');
		process.exit(0);
	}

	// 更新 package.json
	pkg.version = nextVersion;
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');

	// 提交并打 tag
	const tagName = `v${nextVersion}`;

	try {
		run(`git add package.json`);
		run(`git commit -m "chore: release v${nextVersion}"`);
		run(`git tag ${tagName}`);
		run(`git push origin main`);
		run(`git push origin ${tagName}`);
	} catch (e) {
		console.error('\n操作失败:', e.message);
		process.exit(1);
	}

	console.log('\n✅ 发布成功!');
	console.log(`   版本: ${nextVersion}`);
	console.log(`   Tag:  ${tagName}`);
	console.log(`   GitHub Actions 将自动构建并发布到 npm`);
	console.log(`   查看: https://github.com/mo-liu/n8n-nodes-china-holiday/actions`);
})();
