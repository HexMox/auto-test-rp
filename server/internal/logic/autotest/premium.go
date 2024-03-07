package premium

import (
	"bytes"
	"context"
	"os/exec"
	"time"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gcron"
	"github.com/gogf/gf/v2/os/gctx"
)

func init() {
	var (
		err error
		ctx = gctx.New()
	)
	p, _ := g.Cfg().Get(ctx, "patterns.autotest")

	g.Log().Print(ctx, "Auto testing task croning: "+p.String())
	_, err = gcron.AddSingleton(ctx, p.String(), func(ctx context.Context) {
		g.Log().Print(ctx, "Auto testing premium start")
		time.Sleep(2 * time.Second)

		cmd := exec.Command("npx", "playwright", "test", "--project=premium")
		out := new(bytes.Buffer)

		cmd.Stdout = out
		cmd.Stderr = out
		err := cmd.Start()

		if err != nil {
			g.Log().Print(ctx, out)
		} else {
			g.Log().Print(ctx, `Auto testing premium failed: `+err.Error())
		}
	})
	if err != nil {
		panic(err)
	}
	select {}
}
