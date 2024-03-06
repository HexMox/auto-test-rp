package premium

import (
	"context"
	"time"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gcron"
	"github.com/gogf/gf/v2/os/gctx"
)

func Init() {
	var (
		err error
		ctx = gctx.New()
	)
	_, err = gcron.AddSingleton(ctx, "* * * * * *", func(ctx context.Context) {
		g.Log().Print(ctx, "doing")
		time.Sleep(2 * time.Second)
	})
	if err != nil {
		panic(err)
	}
	select {}
}
