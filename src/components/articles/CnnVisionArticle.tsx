import type { ReactNode } from "react";

const references = [
  { authors: "Hubel & Wiesel", year: "1962", title: "Receptive fields, binocular interaction and functional architecture in the cat’s visual cortex", journal: "The Journal of Physiology", url: "https://doi.org/10.1113/jphysiol.1962.sp006837" },
  { authors: "Dumoulin & Wandell", year: "2008", title: "Population receptive field estimates in human visual cortex", journal: "NeuroImage", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3073038/" },
  { authors: "LeCun et al.", year: "1998", title: "Gradient-based learning applied to document recognition", journal: "Proceedings of the IEEE", url: "https://leon.bottou.org/papers/lecun-98h" },
  { authors: "Glorot, Bordes & Bengio", year: "2011", title: "Deep sparse rectifier neural networks", journal: "AISTATS", url: "https://proceedings.mlr.press/v15/glorot11a.html" },
  { authors: "Yamins & DiCarlo", year: "2016", title: "Using goal-driven deep learning models to understand sensory cortex", journal: "Nature Neuroscience", url: "https://doi.org/10.1038/nn.4244" },
  { authors: "Zech et al.", year: "2018", title: "Variable generalization performance of a deep learning model to detect pneumonia in chest radiographs: A cross-sectional study", journal: "PLOS Medicine", url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1002683" },
];

function Cite({ n }: { n: number }) {
  return <sup className="cnn-cite"><a href={`#cnn-ref-${n}`} aria-label={`Reference ${n}: ${references[n - 1].authors}`}>[{n}]</a></sup>;
}

function Equation({ label, children }: { label: string; children: ReactNode }) {
  return <div className="cnn-equation"><math display="block" aria-label={label}>{children}</math></div>;
}

function Matrix({ values, label, image = false }: { values: number[]; label: string; image?: boolean }) {
  return (
    <svg viewBox="0 0 150 150" role="img" aria-label={label}>
      {values.map((value, i) => (
        <g key={i}>
          <rect x={(i % 3) * 50 + 1} y={Math.floor(i / 3) * 50 + 1} width="48" height="48" rx="3" fill={image ? (value === 0 ? "#203858" : "#edf1f5") : value > 0 ? "#203858" : value < 0 ? "#b7c7d8" : "#edf1f5"} />
          <text x={(i % 3) * 50 + 25} y={Math.floor(i / 3) * 50 + 26} dominantBaseline="middle" textAnchor="middle" fill={(image ? value === 0 : value > 0) ? "#fbfaf8" : "#203858"} fontSize="23">{value < 0 ? "−1" : value}</text>
        </g>
      ))}
    </svg>
  );
}

function ConvolutionFigure() {
  return (
    <figure className="cnn-figure">
      <div className="cnn-filter-demo">
        <div><span className="cnn-diagram-label">Image patch</span><Matrix image values={[0, 0, 1, 0, 0, 1, 0, 0, 1]} label="Image patch: three identical rows of zero, zero, one. A vertical change from dark to light." /></div>
        <span className="cnn-operator" aria-hidden="true">×</span>
        <div><span className="cnn-diagram-label">Edge filter</span><Matrix values={[-1, 0, 1, -1, 0, 1, -1, 0, 1]} label="Filter: three identical rows of minus one, zero, one." /></div>
        <span className="cnn-operator" aria-hidden="true">=</span>
        <div className="cnn-response"><span className="cnn-diagram-label">Sum of products</span><strong>3</strong><span>Flat patch: 0</span></div>
      </div>
      <figcaption>Multiply matching cells, then add all nine products. This filter responds to a vertical edge. Any constant patch gives zero. Illustrative values, with no bias.</figcaption>
    </figure>
  );
}

function ReceptiveFieldFigure() {
  return (
    <figure className="cnn-figure">
      <div className="cnn-field-demo">
        {[3, 5, 7].map((size, layer) => (
          <div key={size}>
            <span className="cnn-diagram-label">Layer {layer + 1}</span>
            <svg viewBox="0 0 180 180" role="img" aria-label={`Layer ${layer + 1}: one unit can depend on a ${size} by ${size} region of the original input.`}>
              {Array.from({ length: 81 }, (_, i) => {
                const x = i % 9;
                const y = Math.floor(i / 9);
                const inside = Math.abs(x - 4) <= (size - 1) / 2 && Math.abs(y - 4) <= (size - 1) / 2;
                return <rect key={i} x={x * 20 + 1} y={y * 20 + 1} width="18" height="18" rx="1" fill={inside ? "#203858" : "#e3e9ef"} />;
              })}
              <rect x="84" y="84" width="12" height="12" fill="#fbfaf8" />
            </svg>
            <span className="cnn-diagram-label">{size} × {size} input region</span>
          </div>
        ))}
      </div>
      <figcaption>The same output position depends on more of the original image as layers accumulate. Three 3 × 3 convolutions, stride 1, no dilation. These are input regions, not feature-map sizes.</figcaption>
    </figure>
  );
}

export default function CnnVisionArticle() {
  return (
    <div className="cnn-article">
      <p>A crack can appear anywhere on a metal surface. A useful vision system should recognize it near the corner as well as the center. How does it avoid learning every possible location separately?</p>
      <p>A convolutional neural network, or CNN, applies small filters across an image, then combines their responses across layers. Visual neuroscience helped motivate this design.</p>

      <h2>A small part of the scene</h2>
      <p>A visual neuron has a <strong>receptive field</strong>: a region of the visual scene that influences its activity. In their 1962 experiments on cats, David Hubel and Torsten Wiesel found cortical cells that responded strongly to edges at particular orientations.<Cite n={1} /></p>
      <p>Dumoulin and Wandell used functional MRI in humans to estimate the visual regions that influence groups of neurons. At comparable positions in the visual field, these regions generally grew from primary visual cortex, V1, to a later visual area, V3.<Cite n={2} /></p>
      <p>CNNs use a related arrangement. Each unit initially receives a small neighborhood of pixels. Later units combine signals from earlier ones, so their receptive fields cover more of the image.</p>

      <h2>What a filter actually does</h2>
      <p>Think of a grayscale image as a grid of brightness values. A filter is another, smaller grid of numbers called weights. Place it over a patch, multiply matching entries, and add the products.<Cite n={3} /></p>
      <ConvolutionFigure />
      <p>At image position <i>i, j</i>, that calculation is:</p>
      <Equation label="z sub i j equals the sum over u and v of W sub u v times X sub i plus u, j plus v, plus b.">
        <msub><mi>z</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>=</mo>
        <munder><mo>∑</mo><mrow><mi>u</mi><mo>,</mo><mi>v</mi></mrow></munder>
        <msub><mi>W</mi><mrow><mi>u</mi><mi>v</mi></mrow></msub>
        <msub><mi>X</mi><mrow><mi>i</mi><mo>+</mo><mi>u</mi><mo>,</mo><mi>j</mi><mo>+</mo><mi>v</mi></mrow></msub><mo>+</mo><mi>b</mi>
      </Equation>
      <p><i>X</i> holds image values, <i>W</i> holds weights, and <i>b</i> is an adjustable offset. The indices <i>u, v</i> run over the filter. The result, <i>z</i>, measures its response at that position.</p>
      <p>The same weights move across the image. This <strong>weight sharing</strong> lets one learned detector respond at many locations. Several filters produce several response grids, called feature maps.<Cite n={3} /> Color images also require a sum across input channels. The formula uses an unflipped filter, a convention called <a href="https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv2d.html">cross-correlation</a> in CNN implementations.</p>
      <p>A common next step is the rectified linear unit, or ReLU:<Cite n={4} /></p>
      <Equation label="a equals the maximum of zero and z."><mi>a</mi><mo>=</mo><mi mathvariant="normal">max</mi><mo>(</mo><mn>0</mn><mo>,</mo><mi>z</mi><mo>)</mo></Equation>
      <p>Positive responses pass through. Negative responses become zero. This nonlinearity lets stacked layers express relationships that a single linear filter cannot. ReLU loosely resembles thresholded neural activity, while omitting the timing and chemistry of real neurons.</p>

      <h2>How local becomes larger</h2>
      <p>After one 3 × 3 convolution, a unit sees a 3 × 3 input region. After two, it can depend on 5 × 5 pixels. After three, 7 × 7.</p>
      <ReceptiveFieldFigure />
      <p>Assume the filter moves one pixel per step, with no gaps between its weights. This means stride 1 and no dilation. The receptive-field width after <i>L</i> layers is:</p>
      <Equation label="r sub L equals one plus the sum from l equals one to L of k sub l minus one.">
        <msub><mi>r</mi><mi>L</mi></msub><mo>=</mo><mn>1</mn><mo>+</mo>
        <munderover><mo>∑</mo><mrow><mi>ℓ</mi><mo>=</mo><mn>1</mn></mrow><mi>L</mi></munderover>
        <mo>(</mo><msub><mi>k</mi><mi>ℓ</mi></msub><mo>−</mo><mn>1</mn><mo>)</mo>
      </Equation>
      <p>Here, <i>k</i> is each layer’s filter width. Successive layers can combine edges into textures, contours, and task-relevant patterns. Hierarchical CNNs can predict some neural responses to images along the visual pathway, making them useful models for neuroscience.<Cite n={5} /></p>

      <h2>What the training teaches</h2>
      <p>The edge filter above is hand-chosen. During training, a CNN adjusts its weights using prediction errors. A basic gradient-descent step is:<Cite n={4} /></p>
      <Equation label="theta becomes theta minus eta times the gradient with respect to theta of the loss.">
        <mi>θ</mi><mo>←</mo><mi>θ</mi><mo>−</mo><mi>η</mi><msub><mo>∇</mo><mi>θ</mi></msub><mi mathvariant="normal">Loss</mi>
      </Equation>
      <p><i>θ</i> collects the model’s parameters. The gradient gives the direction of increasing error. Subtracting a small step, scaled by the learning rate <i>η</i>, seeks to reduce it. Backpropagation computes these gradients across layers.</p>
      <p>Human vision includes feedback, eye movements, and learning mechanisms that this simple model leaves out. Shared weights and backpropagation are engineering choices. Their success alone does not establish that the brain uses them.<Cite n={5} /></p>
      <p>Training can also reward the wrong visual cues. In a study of pneumonia detection, Zech and colleagues found that performance fell on outside hospitals in three of five comparisons. Models could identify hospital systems from the images, creating opportunities to exploit site-specific cues.<Cite n={6} /></p>
      <p>For microscopy or factory inspection, that suggests a practical test: does the model still work on a different microscope, camera, or production line? Receptive fields explain which pixels can affect a prediction. Testing across new conditions tells us whether the learned features remain useful.</p>

      <section className="cnn-references" aria-labelledby="cnn-references-title">
        <h2 id="cnn-references-title">References</h2>
        <ol>
          {references.map((ref, i) => <li id={`cnn-ref-${i + 1}`} key={ref.url} tabIndex={-1}>
            {ref.authors} ({ref.year}). <a href={ref.url}>{ref.title}</a>. <cite>{ref.journal}</cite>.
          </li>)}
        </ol>
        <p className="cnn-figure-credit">Original diagrams. Numerical examples illustrate the operations and do not represent experimental measurements.</p>
      </section>
    </div>
  );
}
