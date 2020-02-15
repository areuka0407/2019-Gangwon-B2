class Booth {
    /**
     * 
     * @param {Canvas} canvas 
     * @param {Object} param1 
     */
    constructor(canvas, {text, bl_x, bl_y, bl_w, bl_h}){
        this.canvas = canvas;
        this.text = text;
        this.color = this.canvas.app.color[text];
        this.opacity = 1;

        this.bl_x = bl_x;
        this.bl_y = bl_y;
        this.bl_w = bl_w;
        this.bl_h = bl_h;

        this.x = canvas.bl2px(bl_x, "floor");
        this.y = canvas.bl2px(bl_y, "floor");
        this.width = canvas.bl2px(bl_w, "ceil");
        this.height = canvas.bl2px(bl_h, "ceil");
    }

    include({x, y, width = this.canvas.BLOCK * 0.5, height = this.canvas.BLOCK * 0.5}){
        return x + width > this.x 
            && x < this.x + this.width 
            && y + height > this.y 
            && y < this.y + this.height;
    }

    check(){
        // 다른 부스와 겹치는지의 여부 검사 필요
        let overlap = this.canvas.boothList.find(x => x !== this && x.include(this));
        if(overlap){
            toast(`'${overlap.text}' 부스와 위치가 중복됩니다.`, "bg-danger");
            return false;
        }

        
        // 설치하려는 곳에 길목이 없는 지 검사
        if(this.canvas.type !== 0) {
            let roadOver = this.canvas["road" + this.canvas.type].reduce((p, [x, y]) => {
                x = this.canvas.bl2px(x - 1);
                y = this.canvas.bl2px(y - 1);
                return p || this.include({x, y});
            }, false);

            if(roadOver) {
                toast("길목 위에는 부스를 설치하실 수 없습니다.", "bg-danger");
                return false;
            }
        }

        return true;
    }
}