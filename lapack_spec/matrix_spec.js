
var sylvester = require('../lib/node-sylvester'),
Matrix = sylvester.Matrix;
var A = Matrix.create([[1, 2, 3], [4, 5, 6]]);

describe('matrix', function() {
    describe('LU decomp', function() {
	it('should perform LU decomp on rectangular matrices', function() {
	    var D = $M([
		[3, 6],
		[2, 3],
		[4, 3],
		[2, 120],
	    ]);

	    lu = D.luPack();
	    expect(lu.P.x((lu.L.x(lu.U))).eql(D)).toBeTruthy();
	});
	
	it('should match LU JS to LAPACK', function() {
            var A = $M([
		[4,  2, 1,  4],
		[-9, 4, 3,  9],
		[11, 3, 11, 3],
		[-4, 5, 3,  1]
            ]);
	    
	    expect(A.luJs().U.approxEql(A.luPack().U)).toBeTruthy();
	    expect(A.luJs().L.approxEql(A.luPack().L)).toBeTruthy();
	});
    });

    var U = $M([[-0.5110308651281587, 0.2132007163556105, 0.7071067811881557, 0.4397646068404634],
                [0.08729449334404742, -0.8528028654224428, 1.882731224298497e-12, 0.514885369921382],
                [-0.6856198518162525, -0.42640143271122105, -2.157344709257849e-12, -0.5900061329997158],
                [-0.5110308651281581, 0.21320071635561055, -0.7071067811849397, 0.4397646068456342]]);
    var S = $M([[5.85410196624969, 0, 0, 0],
                [0, 2.999999999999999, 0, 0],
                [0, 0, 1.0000000000000002, 0],
                [0, 0, 0, 0.8541019662496846]]);
    var V = $M([[-0.5110308651281575, 0.21320071635561047, -0.7071067811884307, -0.43976460684002194],
                [0.08729449334404744, -0.8528028654224414, -2.2043789591597237e-12, -0.5148853699213815],
                [-0.6856198518162527, -0.42640143271122066, 2.525858488366184e-12, 0.590006132999716],
                [-0.5110308651281579, 0.21320071635561044, 0.7071067811846652, -0.4397646068460757],
               ]);

    var ASVD = $M([
	[ 1, -1, 2,  2],
	[-1,  2, 1, -1],
	[ 2,  1, 3,  2],
	[ 2, -1, 2,  1]
    ]);
    
    it('should have matching svds for js and lapack', function() {
	var svdJs = ASVD.svdJs();	
	var svdPack = ASVD.svdPack();

	expect(svdJs.U.eql(svdPack.U)).toBeTruthy();
	expect(svdJs.S.eql(svdPack.S)).toBeTruthy();
	expect(svdJs.V.eql(svdPack.V)).toBeTruthy();
    });

    var QRin = $M([
        [1, -1, 2, 2],
        [-1, 2, 1, -1],
        [2, 1, 3, 2],
        [2, -1, 2, 1]
    ]);

    var Qout = $M([[-0.316227766016838, 0.28342171556262064, 0.8226876614429064, -0.3779644730092273],
                   [0.31622776601683794, -0.6883098806520787, 0.5323273103454103, 0.3779644730092272],
                   [-0.6324555320336759, -0.6478210641431328, -0.19357356739833098, -0.37796447300922714],
                   [-0.6324555320336759, 0.16195526603578317, 0.048393391849582745, 0.7559289460184544]]);
    var Rout = $M([[-3.1622776601683795, 0.9486832980505139, -3.478505426185217, -2.8460498941515415],
                   [1.91055907392895e-17, -2.4698178070456938, -1.7410191098846692, 0.1214664495268375],
                   [-2.254600901479451e-16, 2.0686390257580927e-16, 1.6937687147353957, 0.7742942695933234],
                   [3.446764628337833e-17, 8.098938594673387e-17, 2.220446049250313e-16, -1.1338934190276815]]);

    it('should qr from lapack', function() {
	var qr = QRin.qrPack();
	//expect(qr.Q.eql(Qout)).toBeTruthy();
	//expect(qr.R.eql(Rout)).toBeTruthy();
    });
});
